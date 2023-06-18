import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import { useEffect } from "react";

export default function Home(){
    const router = useRouter();
    const [chapterData, setChapterData] = useState();
    

    const getChapterJson = () => {
        let data = require(`../chapterData.json`);
        setChapterData(data);
    }
    useEffect( () => ( getChapterJson() ), [] )

    function Chapter({num, type, title, imgPath, q_count}){

        return (
            <div className="m-2 rounded-lg bg-amber-100 border-2 border-amber-100">
            <Link href={'quiz/' + num}>
                <div className="p-2">
                <div className="text-lg">{type} ({q_count}문제)</div>
                <div className="text-xl font-bold">{title}</div>
                </div>
                <Image
                    className="mx-auto rounded-lg"
                    src={imgPath}
                    width={600}
                    height={100}
                    alt={num}
                />
            </Link>
            </div>
        )
    }
    
    return(
        <div>
            <BackButton link="/"/>
            <div className="font-extrabold pt-4 text-3xl text-center">
                화법과 작문 (3-1)
            </div>
            <div className="font-extrabold p-2 text-xl text-center">
                자작 퀴즈 풀기
            </div>
            <div>
                {
                    chapterData?.map((data, key)=>(
                        <Chapter 
                            key={key}
                            num={key+1}
                            type={data.type}
                            title={data.title}
                            imgPath={data.imgPath}
                            q_count={data.q_count}
                        />
                    ))
                }
            </div>

            <div className="mt-10 text-center">문제를 다 푸셨나요?</div>
            <div className="text-center text-sm">설문조사로 피드백을 주시면 도움이 됩니다!</div>
            <div className="flex">
            <Link
                href='https://docs.google.com/forms/d/e/1FAIpQLSce_97Z0QtDfEfhKJzJyTghauBGVLFzvPybd_nV9RrXQ-m1gg/viewform'
                className="mt-2 mx-auto py-2 px-4 rounded-lg border-2 bg-purple-200 border-purple-300">
                설문조사 참여하기
            </Link>
            </div>
            
            <div className="py-10 text-center">
                <Link href={'/ee'}>
                        퀴즈 제작: 김연준, 백주은, 손희원, 오수인, 최재경
                </Link>
            </div>
        </div>
    );
}