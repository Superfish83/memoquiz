import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BackButton({ link }){
    return (
        <div>
            <Link href={link}>        
            <ChevronLeftIcon
                className="h-8 w-8 stroke-slate-600"/>
            </Link>
        </div>
    );
}