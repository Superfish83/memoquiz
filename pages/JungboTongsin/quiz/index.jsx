import BackButton from "@/components/BackButton";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home(){
    const router = useRouter();

    function Chapter({num, title, desc, unready}){
        const displayTitle = (num>0) ? `Chapter.${num} - ${title}` : "종합 퀴즈"

        if (unready){
            return (
            <div className="border-2 border-slate-200 m-2 p-2 rounded-lg bg-slate-100">
                <div>
                    <div className="text-xl font-bold">{displayTitle}</div>
                    <div className="text-lg">준비 중입니다.</div>
                </div>
            </div>
            )
        }
        return (
            <div className="border-2 border-violet-200 m-2 p-2 rounded-lg bg-violet-100">
            <Link href={'quiz/' + num}>
                <div className="text-xl font-bold">{displayTitle}</div>
                <div className="text-lg">{desc}</div>
            </Link>
            </div>
        )
    }
    
    return(
    <div>
        <BackButton link="/"/>
        <div className="font-extrabold pt-4 text-3xl text-center">
            정보통신 (모두의 네트워크)
        </div>
        <div className="font-extrabold p-2 text-xl text-center">
            퀴즈 풀기
        </div>
        <div>
            <Chapter num={1} title="네트워크 첫걸음" desc="네트워크, 데이터, LAN과 WAN"/>
            <Chapter num={2} title="네트워크의 기본 규칙" desc="프로토콜, OSI 7계층, 캡슐화"/>
            <Chapter num={3} title="물리 계층" desc="통신 매체, 케이블, 리피터, 허브"/>
            <Chapter num={4} title="데이터 링크 계층" desc="이더넷, MAC 주소, 스위치"/>
            <Chapter num={5} title="네트워크 계층" desc="IP 주소, 서브넷, 라우터"/>
            <Chapter num={0} desc="전 범위를 대상으로 실력을 테스트해 보세요."/>
        </div>
    </div>);
}