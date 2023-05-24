import BackButton from "@/components/BackButton";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash'


export default function Quiz(){
    const router = useRouter();

    const [quizData, setQuizData] = useState(null);
    const [questionNum, setQuestionNum] = useState(0);
    const [corrects, setCorrects] = useState([]);

    const fetchJson = (id) => {
        fetch("../../quizdata/ch" + id + ".json")
        .then(response => {
          return response.json();
        }).then(data => {
          let shfData = shuffle(data);
          for(let i = 0; i < data.length; i++){
            let item = shfData[i];
            item.options = shuffle(item.options);
            shfData[i] = item;
          }
          console.log(data)
          console.log(shfData)
          setQuizData(shfData);
        }).catch((e) => {
          console.log(e.message);
        });
      }

    useEffect(() => {
        if(router.isReady)
            fetchJson(router.query.quizid)
    }, [router.isReady]);

    function handleChoose(key){
        let cor = corrects;
        if(quizData[questionNum].correctAnswer === quizData[questionNum].options[key]){
            console.log("right");
            cor.push(1);
        }
        else{
            console.log("wrong");
            cor.push(0);
        }
        setCorrects(cor);
        if(questionNum + 1 < quizData.length){
            setQuestionNum(questionNum+1);
        }
        else{
            router.push({
                pathname: '/JungboTongsin/quiz/result',
                query: { c: corrects, id: router.query.quizid },
            })
        }
    }

    function Question(){
        return (
            <div className="p-2">
                <div className="text-xl font-bold">문제 {questionNum+1}</div>
                <div className="pt-2 pb-4">{quizData[questionNum].question}</div>

                {quizData[questionNum].options?.map((data, key) => (
                    <button
                        key={key}
                        onClick={() => {handleChoose(key)}}
                        className="border-2 w-full p-2 m-1 border-slate-400 rounded-lg">
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
        {quizData ? 
            <Question/> : <div>데이터 로드 중...</div>
        }
    </div>
    );
}