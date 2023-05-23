import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
    const [ corrects, setCorrects ] = useState([]);
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

    return (
    <div>
        <div className="text-center p-4 text-2xl font-bold">
            퀴즈 점수
            <div className="text-3xl p-2 text-amber-400">
                {Math.round((corrects.filter(item => item === "1").length)
                / (corrects.length) * 100)}점
            </div>
        </div>
        <div className="text-xl p-1">채점 결과</div>
        {corrects ? (
        <div className="grid grid-cols-5">
            {corrects?.map((data, key) => (
                <div className="border-2 text-center" key={key}>
                    <div className="border-2">
                        {key+1}번
                    </div>
                    <div className="border-2">
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