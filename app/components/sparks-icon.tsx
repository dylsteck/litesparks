import Image from "next/image";

export default function SparksIcon(){
    return (
        <Image
            className="dark:invert"
            src="/sparks-white-transparent.png"
            alt="Sparks icon"
            width={25}
            height={25}
            priority
          />
    )
}