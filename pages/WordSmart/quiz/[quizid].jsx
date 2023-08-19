import BackButton from "@/components/BackButton";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash'
import Link from "next/link";

export default function Quiz(){
    const router = useRouter();

    // 퀴즈 목록, chapter 데이터 불러와 저장하는 state
    const [quizData, setQuizData] = useState(null);
    const [chapterData, setChapterData] = useState();

    // Word Bank 정보 저장
    const [wordBank, setWordBank] = useState([]);

    // 퀴즈 목록 중에서 현재 표시할 퀴즈의 번호
    const [quizNum, setQuizNum] = useState(0);
    // 힌트(첫 글자) 표시 여부
    const [showHint, setShowHint] = useState(false);

    // 방금 퀴즈가 맞았는지 여부
    const [prevCorrect, setPrevCorrect] = useState(false);
    // 방금 퀴즈의 정답 표시
    const [prevAnswer, setPrevAnswer] = useState(null);

    // 사용자가 입력한 답안 데이터
    const [answer, setAnswer] = useState("");
    
    const getChapterJson = () => {
        let data = require(`../chapterData.json`);
        setChapterData(data[router.query.quizid - 1]);
    }

    const getQuizJson = (id) => {
        let data = require(`./quizdata/${id}.json`);

        let bank = [] // Word Bank
        for(let i = 0; i < data.length; i++){
            bank.push(data[i].correctAnswer);
        }
        setWordBank(bank);
        
        let shfData = shuffle(data);

        let endData = {
            question: `이 목차의 단어를 모두 학습했습니다.`,
            correctAnswer: ""
        };
        shfData.push(endData);

        setQuizData(shfData);
      }

    useEffect(() => {
        if(router.isReady){
            setQuizData([]);
            getChapterJson();
            getQuizJson(router.query.quizid);
        }
    }, [router.isReady]);

    function handleKeyDown(e){
        if(e.key === "Enter" && answer?.length > 0){
            const corAns = quizData[quizNum].correctAnswer;
            const refinedAnswer = answer.toLowerCase().trim();
            // Enter 입력(정답 제출) 시 처리
            if(refinedAnswer === corAns){
                // 정답이라면
                setPrevCorrect(true);
            }
            else{
                setPrevCorrect(false);
            }
            setQuizNum(quizNum+1);
            setPrevAnswer(corAns);
            setAnswer("");
            e.target.value = "";
        }
    }

    function WordBank(){
        return (
            <div className="m-4 p-2 border-2 mt-20 mb-10 rounded-xl">
                <div className="text-center my-2 font-bold">Word Bank</div>
                <div className="flex flex-wrap text-slate-600">
                    {wordBank?.map((data, key)=> (
                        <div className="mx-2" key={key}>{data}</div>
                    ))}
                </div>
            </div>
        )
    }


    function Question({data}){
        return (
            <div>
                {prevAnswer ? (<div
                    className={`text-center font-bold ${prevCorrect ? "text-emerald-500" : "text-red-500"}`}>
                    {(prevCorrect ? "맞았습니다!" : "틀렸습니다...") +  ` 정답: ${prevAnswer}`}
                </div>) : null}
                <div className="p-4 m-4 border-2 rounded-lg">
                    Definition: {data?.question}
                </div>
            </div>
        )
    }

    return (
    <div>
        <BackButton link="/WordSmart/quiz"/>
        {
            quizData ? 
                (<div>
                    <div className="text-center pt-4 text-2xl font-bold">
                        퀴즈
                    </div>
                    <div className="text-center pb-4 font-bold">
                        {chapterData?.type} : &quot;{chapterData?.title}&quot;
                    </div>
                    <Question className="my-10" data={quizData[quizNum]}/>
                    <div className="flex">
                        {quizData[quizNum]?.correctAnswer?.length > 0 ? (
                                <div className="mx-auto">
                                    <div className="text-slate-500 mb-2 flex itmes-center">
                                        <input
                                            type="checkbox"
                                            checked={showHint}
                                            onChange={() => setShowHint(!showHint)}
                                            />
                                        <div className="ml-2">
                                            Show first letter
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-2">Word: </div>
                                        <input
                                            onKeyDown={handleKeyDown}
                                            onChange={(e) => setAnswer(e.target?.value)}
                                            className="mx-auto border-2 border-slate-600 text-pink-500 rounded-lg p-2"
                                            placeholder={
                                                showHint ?
                                                `${quizData[quizNum]?.correctAnswer[0]}...` :
                                                "[Enter]로 제출"
                                            }/>
                                    </div>
                                </div>
                            ) : (
                            <Link href="/WordSmart/quiz/" 
                                className="mx-auto border-2 border-slate-800 rounded-lg p-2">돌아가기</Link>)
                        }
                    </div>
                    <WordBank/>
                </div>)
                : (<div>데이터 로드 중...</div>)
        }
    </div>
    );
}