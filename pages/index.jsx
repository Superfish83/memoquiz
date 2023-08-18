import Link from "next/link";
import Image from 'next/image';

export default function Index(){

    function PageCard({name, imgpath, qlink, slink}){
        return (
            <Link 
                href={qlink}
                    className="mx-auto">
                <div className="m-4 py-2 rounded-xl border-2 shadow-lg">
                    <div className="text-center font-bold text-2xl my-2">
                        {name}
                    </div>
                    <Image
                        className="p-2 mx-auto rounded-3xl object-cover h-72"
                        src={imgpath}
                        width={500}
                        height={500}
                        alt={name}
                        />
                </div>
            </Link>
        )
    }

    return (
    <div >
        <div className="font-extrabold p-4 text-3xl text-center">
            퀴즈 사이트
            <div className="font-bold p-1 text-lg">
                웹사이트 제작: 김연준
            </div>
        </div>
        <div>
            <PageCard 
                name="Word Smart"
                imgpath="/titleimg/ws1.jpg"
                qlink="/WordSmart/quiz"/>
            <PageCard 
                name="3-1 화작 (수능특강) 독서"
                imgpath="/titleimg/st1.png"
                qlink="/Korean/quiz"
                slink="/Korean/study"/>
            <PageCard 
                name="3-1 정보통신 (네트워크)"
                imgpath="/titleimg/jt1.jpg"
                qlink="/JungboTongsin/quiz"
                slink="/JungboTongsin/study"/>
        </div>
    </div>
    );
}