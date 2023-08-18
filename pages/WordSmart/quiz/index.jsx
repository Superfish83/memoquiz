import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import { useEffect } from "react";

export default function Home(){
    const [chapterData, setChapterData] = useState();
    

    const getChapterJson = () => {
        let data = require(`../chapterData.json`);
        setChapterData(data);
    }
    useEffect( () => ( getChapterJson() ), [] )

    function Chapter({num, type, title}){

        return (
            <div className="m-2 rounded-lg bg-emerald-100 border-2 border-white">
            <Link href={'quiz/' + num}>
                <div className="p-2">
                <div className="text-lg">{type}</div>
                <div className="text-xl font-bold">{title}</div>
                </div>
            </Link>
            </div>
        )
    }
    
    return(
        <div>
            <BackButton link="/"/>
            <div className="font-extrabold pt-4 text-3xl text-center">
                Word Smart
            </div>
            <div className="font-extrabold p-2 text-xl text-center">
                IB영어 워드스마트긴급대책위원회
            </div>
            <div>
                {
                    chapterData?.map((data, key)=>(
                        <Chapter 
                            key={key}
                            num={key+1}
                            type={data.type}
                            title={data.title}
                        />
                    ))
                }
            </div>
        </div>
    );
}