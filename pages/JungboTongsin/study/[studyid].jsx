import { useRouter } from "next/router";


export default function Study(){
    const router = useRouter();
    const id = router.query.studyid;
    
    return (
        <div className="">
            <div className="font-extrabold pt-4 text-3xl text-center">
                정보통신 (3-1)
            </div>
            <div className="font-extrabold p-2 text-xl text-center">
                Chapter {id}
            </div>
            <div>
                <embed
                src={"../../pdfs/ch" + id + ".pdf"}
                type="application/pdf"
                className="w-full h-[500px]"
                title="PDF Viewer"
                />
            </div>
        </div>
    );
}