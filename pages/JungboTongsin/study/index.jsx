import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function Home(){
    const router = useRouter();

    function Chapter({num, desc}){
        return (
            <div className="border-2 border-blue-200 m-2 p-2 rounded-lg bg-blue-100">
            <Link href={'study/' + num}>
                <div className="text-xl font-bold">Chapter.{num}</div>
                <div className="text-lg">{desc}</div>
            </Link>
            </div>
        )
    }

    const chapters = {
        '1' : ''
    }
    
    return(
        <div>
            <ChevronLeftIcon
                className="h-8 w-8 stroke-slate-600"
                onClick={() => {router.push("/")}}
            />
            <div className="font-extrabold pt-4 text-3xl text-center">
                정보통신 (3-1)
            </div>
            <div className="font-extrabold p-2 text-xl text-center">
                수업 자료
            </div>
            <div>
                <Chapter num={1} desc="랜과 왠에 대해 배웁니다."/>
                <Chapter num={2} desc="물리 계층에 대해 배웁니다."/>
                <Chapter num={3} desc="데이터 링크 계층에 대해 배웁니다."/>
            </div>
        </div>
    );
}