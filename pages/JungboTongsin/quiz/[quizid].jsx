import { useRouter } from "next/router";

export default function Quiz(){
    const router = useRouter();

    return (
        <div>
            {router.query.quizid}
        </div>
    );
}