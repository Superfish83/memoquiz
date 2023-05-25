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
                    src={"../../pdfs/ch" + id + ".pdf"}
                    type="application/pdf"
                    className="w-full h-[490px]"
                    title="PDF Viewer"
                />
            </div>
        </div>
    );
}