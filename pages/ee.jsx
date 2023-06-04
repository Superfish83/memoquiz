import Link from "next/link";
import Image from 'next/image';

export default function EasterEgg(){

    return (
    <div>
            <div className="font-extrabold mt-20 text-center">
                이스터에그를 찾으셨습니다. 축하드려요~
            </div>
            <div>
                <Image
                    className="p-2 mx-auto rounded-3xl"
                    src="/titleimg/duck-spinning.gif"
                    width={700}
                    height={700}
                    alt="duck-spinning"
                />
            </div>
    </div>
    );
}