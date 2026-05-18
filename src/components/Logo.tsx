import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image
        className="block dark:hidden"
        src="/logo.svg"
        alt="පරිගණක මහගෙදර"
        width={100}
        height={100}
      />

      <Image
        className="hidden dark:block"
        src="/logo-dark.svg"
        alt="පරිගණක මහගෙදර"
        width={100}
        height={100}
      />
    </>
  );
}