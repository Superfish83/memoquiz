import BackButton from "@/components/BackButton";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from 'react';
import { shuffle } from 'lodash'
import { News_Cycle } from "next/font/google";

export default function Quiz(){
    const router = useRouter();
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [quizData, setQuizData] = useState(null);
    const [selectData, setSelectData] = useState([]);;
    const [corrects, setCorrects] = useState([]);
    const [wrongData, setWrongData] = useState([]);
    const [score, setScore] = useState(-1);

    const fetchJson = (id) => {
        fetch("../../jt/quizdata/ch" + id + ".json")
        .then(response => {
          return response.json();
        }).then(data => {
          let shfData = shuffle(data);
          let selData = []
          for(let i = 0; i < data.length; i++){
            let item = shfData[i];
            item.options = shuffle(item.options);
            shfData[i] = item;
            selData.push(-1);
          }
          //console.log(data)
          //console.log(shfData)
          setSelectData(selData);
          setQuizData(shfData);
        }).catch((e) => {
          console.log(e.message);
        });
      }

    useEffect(() => {
        if(router.isReady)
            fetchJson(router.query.quizid)
    }, [router.isReady]);

    function handleChoose(num, key){
        let newSelect = selectData;
        newSelect[num] = key;
        setSelectData(newSelect);
        forceUpdate();
    }

    function handleScore(){
        let cor = []
        let wrong = [];
        let corCnt = 0;
        for(let i = 0; i < quizData.length; i++){
            const data = quizData[i];
            const select = selectData[i];
            if(data.options[select] === data.correctAnswer){
                cor.push(true);
                corCnt+=1;
            }
            else{
                cor.push(false);
                let item = {
                    'id' : i,
                    'query' : data.question,
                    'user' : data.options[select],
                    'correct' : data.correctAnswer,
                }
                wrong.push(item)
            }
        }

        setCorrects(cor);
        setWrongData(wrong);
        setScore(Math.round((corCnt / cor.length) * 100));
        window.scrollTo({ top:0 });
    }
    
    function getComment(){
        if(score >= 0){
            if(score < 40) return <div className="text-red-500">공부하세요!</div>;
            if(score < 60) return <div className="text-lime-500">조금은 아시는군요.</div>;;
            if(score < 100) return <div className="text-blue-500">오~ 좀 치는군요.</div>;
            if(score == 100) return <div className="text-purple-500">완벽합니다.</div>;
        }
    }

    function Question({id, data, sel}){
        const num = id;
        const query = data.question;
        const options = data.options;
        return (
            <div className="p-2">
                <div className="text-xl font-bold">문제 {num+1}</div>
                <div className="pt-2 pb-4">{query}</div>

                {options?.map((data, key) => (
                    <button
                        key={key}
                        onClick={() => {handleChoose(num, key)}}
                        className={`border-2 w-full p-2 m-1 rounded-lg 
                        ${sel[num]===key ? "border-purple-300 bg-purple-200" : "border-slate-400"}`}>
                        {data}
                    </button>
                ))
                }
            </div>
        );
    }
    

    return (
    <div>
        <BackButton link="/JungboTongsin/quiz"/>
        {score === -1 ? (
            quizData ? 
                (<div>
                    {router.query.quizid == 0 ? (
                        <div>
                        <div className="text-center p-4 text-2xl font-bold">
                            종합 퀴즈
                        </div>
                        <div className="text-center font-bold text-sm">
                            [문제 1 ~ 12] 괄호에 들어갈 가장 적절한 말을 고르세요.
                        </div>
                        </div>
                    ) : (
                        <div className="text-center p-4 text-2xl font-bold">
                            {router.query.quizid}장 퀴즈
                        </div>
                    )}
                    {
                        quizData?.map((data, key) => (
                            <div className="my-10" key={key}>
                                <Question id={key} data={data} sel={selectData}/>
                            </div>
                            )
                        )
                    }
                    <button
                        onClick={handleScore}
                        className={`border-2 w-full text-center p-2 m-1  rounded-lg 
                        ${!selectData.includes(-1) ? "border-blue-400 bg-blue-300" : "border-slate-400 bg-slate-300"}`}
                        disabled={selectData.includes(-1)}>
                        채점하기
                    </button>
                </div>) : (<div>데이터 로드 중...</div>)
            ) : (
                <div>
                    <div className="text-center p-4 text-2xl font-bold">
                        {router.query.quizid == 0 ? `종합 퀴즈 점수` :
                            `${router.query.quizid}장 퀴즈 점수`}
                        <div className="text-3xl p-2 text-amber-400">
                            {score}점
                            {getComment()}
                        </div>
                    </div>
                    
                    <div className="text-xl p-1">채점 정오표</div>
                    {corrects ? (
                    <div className="grid grid-cols-4">
                        {corrects?.map((data, key) => (
                            <div className="border-2 text-center" key={key}>
                                <div className="border-2 py-2">
                                    {key+1}번
                                </div>
                                <div className="border-2 py-5">
                                    {corrects[key] ? (<div className="text-blue-500 text-bold">
                                        O
                                    </div>) : (<div className="text-red-500 text-bold">
                                        X
                                    </div>)}
                                </div>
                            </div>
                        ))}                        
                    </div>) : null}


                    {(wrongData.length > 0) ? 
                    (<div className="text-center mt-10">
                        <div className="font-bold text-2xl">
                            틀린 문제들
                        </div>
                        {wrongData?.map((data, key) => (
                            <div className="m-5" key={key}>
                                <div className="font-bold text-lg">
                                    문제 {data.id+1}
                                </div>
                                <div className="text-left">
                                    <div className="my-2 border-2 p-2 border-slate-200 rounded-lg">
                                        {data.query}
                                    </div>
                                    <div className="text-red">
                                        당신의 답: {data.user}
                                    </div>
                                    <div className="text-red-600">
                                        정답: {data.correct}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>) : null}
                    
                </div>
            )
        }
    </div>
    );
}