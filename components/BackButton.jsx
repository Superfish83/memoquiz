import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BackButton({ link }){
    return (
        <div className="h-8 w-8">
            <Link href={link}>        
            <HomeIcon
                className="h-8 w-8 stroke-slate-600"/>
            </Link>
        </div>
    );
}