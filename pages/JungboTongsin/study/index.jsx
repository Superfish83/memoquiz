import Link from "next/link";
import { useRouter } from "next/router";
import BackButton from "@/components/BackButton";

export default function Home(){
    const router = useRouter();

    function Chapter({num, title, desc}){
        const displayTitle = `Chapter.${num} - ${title}`

        return (
            <div className="border-2 border-blue-200 m-2 p-2 rounded-lg bg-blue-100">
            <Link href={'study/' + num}>
                <div className="text-xl font-bold">{displayTitle}</div>
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
            <BackButton link="/"/>
            <div className="font-extrabold pt-4 text-3xl text-center">
                정보통신 (3-1)
            </div>
            <div className="font-extrabold p-2 text-xl text-center">
                수업 자료
            </div>
            <div>
                <Chapter num={1} title="네트워크 첫걸음" desc="네트워크, 데이터, LAN과 WAN"/>
                <Chapter num={2} title="네트워크의 기본 규칙" desc="프로토콜, OSI 7계층, 캡슐화"/>
                <Chapter num={3} title="물리 계층" desc="케이블, 리피터"/>
                <Chapter num={4} title="데이터 링크 계층" desc="이더넷, MAC 주소, 스위치"/>
                <Chapter num={5} title="네트워크 계층" desc="IP 주소, 서브넷, 라우터"/>
            </div>
        </div>
    );
}