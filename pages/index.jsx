import Link from "next/link";
import Image from 'next/image';

export default function Index(){

    function PageCard({name, imgpath, qlink, slink}){
        return (
            <div className="m-4 py-2 rounded-xl border-2 shadow-xl">
                <div className="text-center font-bold text-2xl">
                    {name}
                </div>
                <Image
                    className="p-2 mx-auto rounded-3xl"
                    src={imgpath}
                    width={500}
                    height={500}
                    alt={name}
                />
                <div className="grid grid-cols-2 text-center">
                    {qlink ? 
                    <Link 
                        href={qlink}
                        className="bg-gray-200 rounded-lg p-2 mx-auto">
                        퀴즈 풀기
                    </Link> : <div className="mx-auto">준비 중입니다.</div>}
                    {slink ? 
                    <Link 
                        href={slink}
                        className="bg-gray-200 rounded-lg p-2 mx-auto">
                        공부하기
                    </Link> : <div className="mx-auto">준비 중입니다.</div>}
                </div>
            </div>
        )
    }

    return (
    <div >
        <div className="font-extrabold p-4 text-3xl text-center">
            2회고사 퀴즈 사이트
            <div className="font-bold p-1 text-lg">
                만든사람: 김연준
            </div>
        </div>
        <div>
            <PageCard 
                name="화작(수능특강)"
                imgpath="/titleimg/st1.png"
                qlink="/Korean/quiz"
                slink="/Korean/study"/>
            <PageCard 
                name="정보통신(네트워크)"
                imgpath="/titleimg/jt1.jpg"
                qlink="/JungboTongsin/quiz"
                slink="/JungboTongsin/study"/>
            <Link href={'/ee'}
                className="border-white text-white bg-white">
                    2회고사 ㅎㅇㅌ
            </Link>
        </div>
    </div>
    );
}