import BackButton from "@/components/BackButton";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Study(){
    const router = useRouter();
    const id = router.query.studyid;
    
    return (
        <div className="">
            <BackButton link="/JungboTongsin/study"/>
            <div className="text-3xl mx-auto pt-4 font-extrabold text-center">
                정보통신 (3-1)
            </div>
            <div className="font-extrabold p-2 text-xl text-center">
                Chapter {id}
            </div>
            <div>
                <embed
                    src={"../../jt/pdfs/ch" + id + ".pdf"}
                    type="application/pdf"
                    className="w-full h-[470px]"
                    title="PDF Viewer"
                />
            </div>
            <div className="text-slate-600 p-2 text-center">
                <div>이 pdf 파일은 수업시간에 배부된 자료입니다. 시험공부 용도로만 사용해 주세요</div>
            </div>
        </div>
    );
}