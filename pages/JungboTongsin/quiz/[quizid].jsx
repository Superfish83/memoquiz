import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function Quiz(){
    const router = useRouter();


    return (
        <div>
            <ChevronLeftIcon
                className="h-8 w-8 stroke-slate-600"
                onClick={() => {router.push("/JungboTongsin/quiz")}}
            />
            {router.query.quizid}
        </div>
    );
}