import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import { useEffect } from "react";

export default function Home(){
    const router = useRouter();
    const [chapterData, setChapterData] = useState();
    
    const fetchJson = () => {
        fetch("../../korean/chapterdata.json")
        .then(response => {
          return response.json();
        }).then(data => {
          setChapterData(data);
        }).catch((e) => {
          console.log(e.message);
        });
    }
    useEffect( () => ( fetchJson() ), [] )

    function Chapter({num, type, title, imgPath}){

        return (
            <div className="m-2 rounded-lg bg-amber-100">
            <Link href={'study/' + num}>
                <div className="p-2">
                <div className="text-lg">{type}</div>
                <div className="text-xl font-bold">{title}</div>
                </div>
                <Image
                    className=" mx-auto rounded-lg"
                    src={imgPath}
                    width={600}
                    height={400}
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
                수업 자료
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
                        />
                    ))
                }
            </div>
        </div>
    );
}