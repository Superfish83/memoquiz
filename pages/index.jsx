import Link from "next/link";
import Image from 'next/image';

export default function Index(){

    function PageCard({name, imgpath, qlink, slink}){
        return (
            <div className="m-4 p-4 rounded-xl border-2 border-slate-500 shadow-xl">
                <div className="text-center font-bold text-2xl">
                    {name}
                </div>
                <Image
                    className="p-2 mx-auto"
                    src={imgpath}
                    width={500}
                    height={500}
                />
                <div className="grid grid-cols-2 pt-2 text-center">
                    {qlink ? 
                    <Link 
                        href={qlink}
                        className="bg-blue-200 rounded-lg p-2 mx-auto">
                        퀴즈 풀기
                    </Link> : <div className="mx-auto">준비 중입니다.</div>}
                    {slink ? 
                    <Link 
                        href={slink}
                        className="bg-blue-200 rounded-lg p-2 mx-auto">
                        공부하기
                    </Link> : <div className="mx-auto">준비 중입니다.</div>}
                </div>
            </div>
        )
    }

    return (
    <div >
        <div className="font-extrabold p-4 text-4xl text-center">
            Hello 퀴즈사이트!
            <div className="font-bold p-1 text-xl">
                만든사람: 김연준
            </div>
        </div>
        <div>
            <PageCard 
                name="정보통신 (모두의 네트워크)"
                imgpath="/jt1.jpg"
                qlink="/JungboTongsin/quiz"
                slink="/JungboTongsin/study"/>
            <PageCard 
                name="정보통신 (혼자 공부하는 머신러닝)"
                imgpath="/ai1.jpeg"/>
            <PageCard 
                name="Word Smart 1"
                imgpath="/ws1.jpeg"/>
        </div>
    </div>
    );
}