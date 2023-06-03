import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLocation } from "react-router-dom";

export default function Home() {
    const [ corrects, setCorrects ] = useState([]);
    const [ wrongData, setWrongData ] = useState([]);
    const [ score, setScore ] = useState(-1);
    const router = useRouter();
    const state = useLocation().state;

    useEffect(() => {
        if(!router.isReady) return;

        if(state.c){
            setCorrects(state.c);
            setWrongData(state.wrongData);
        }
        else{
            alert("잘못된 접근입니다.");
        }
    }, [router.isReady])
    useEffect(() => {
        setScore(Math.round((corrects.filter(item => item === "1").length)
        / (corrects.length) * 100));
    }, [corrects]);

    function getComment(){
        if(score >= 0){
            if(score < 40) return <div className="text-red-500">공부하세요!</div>;
            if(score < 60) return <div className="text-lime-500">조금은 아시는군요.</div>;;
            if(score < 100) return <div className="text-blue-500">오~ 좀 치는군요.</div>;
            if(score == 100) return <div className="text-purple-500">완벽합니다.</div>;
        }
    }

    return (
    <div>
        <div className="text-center p-4 text-2xl font-bold">
            퀴즈 점수
            <div className="text-3xl p-2 text-amber-400">
                {score}점
                {getComment()}
            </div>
        </div>
        <div className="text-xl p-1">채점 결과</div>
        {corrects ? (
        <div className="grid grid-cols-5">
            {corrects?.map((data, key) => (
                <div className="border-2 text-center" key={key}>
                    <div className="border-2 py-2">
                        {key+1}번
                    </div>
                    <div className="border-2 py-5">
                        {data === "1" ? (<div className="text-blue-500 text-bold">
                            O
                        </div>) : (<div className="text-red-500 text-bold">
                            X
                        </div>)}
                    </div>
                </div>
            ))}
        </div>) : null}
        
        <div className="w-full flex justify-center mt-10">
        <button
            className="border-2 border-blue-300 bg-blue-200 rounded-xl p-2 my-4"
            onClick={() => { router.push(`/JungboTongsin/quiz/${state.id}` ); }
        }>
            다시 풀기
        </button>
        </div>

        {(wrongData.length > 0) ? 
            (<div className="text-center">
                틀린 문제들
                {wrongData?.map((data, key) => (
                    <div className="m-5">
                        <div className="font-bold">
                            {key}. 문제 {data[0]}
                        </div>
                        <div className="">
                            {data[1]}
                        </div>
                        <div className="text-red">
                            정답: {data[2]}
                        </div>
                        <div className="text-red">
                            당신의 답: {data[3]}
                        </div>
                    </div>
                ))}
            </div>) : null
        }
    </div>
    );
}