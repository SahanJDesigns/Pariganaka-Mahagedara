import Image from "next/image";

export function Logo() {
  return (
    <Image
      className="block"
      src="/logo.svg"
      alt="පරිගණක මහගෙදර"
      width={100}
      height={100}
    />
  );
}
