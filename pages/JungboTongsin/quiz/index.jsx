import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function Home(){
    const router = useRouter();

    function Chapter({num, desc}){
        return (
            <div className="border-2 border-red-200 m-2 p-2 rounded-lg bg-red-100">
            <Link href={'quiz/' + num}>
                <div className="text-xl font-bold">Chapter.{num} - 퀴즈</div>
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
            퀴즈 풀기
        </div>
        <div>
            <Chapter num={1} desc="랜과 왠에 대해 배웁니다."/>
            <Chapter num={2} desc="물리 계층에 대해 배웁니다."/>
            <Chapter num={3} desc="데이터 링크 계층에 대해 배웁니다."/>
        </div>
    </div>);
}