import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
    const [ corrects, setCorrects ] = useState([]);
    const [ score, setScore ] = useState(-1);
    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) return;

        if(router.query.c){
            setCorrects(router.query.c);
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
        if(score > 0){
            if(score <= 30) return <div className="text-red-500">허접하군요 !</div>;
            if(score <= 60) return <div className="text-yellow-500">어느 정도는 아시는군요.</div>;;
            if(score <= 99) return <div className="text-green-500">오~ 좀 치는군요.</div>;
            if(score <= 100) return <div className="text-purple-500">완벽합니다.</div>;
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
            onClick={() => { router.push(`/JungboTongsin/quiz/${router.query.id}` ); }
        }>
            다시 풀기
        </button>
        </div>
    </div>
    );
}