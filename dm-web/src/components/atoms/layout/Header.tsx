import Link from "next/link";

export const Header = () => {
  return (
    <header
      className={`text-gray-800 bg-white w-full p-2 md:px-5 flex justify-between shadow-lg items-center`}
    >
      <h1 className={`headingMd border-2 border-orange-500 italic px-1`}>
        DO MISSION
      </h1>
      <div className={`space-x-4`}>
        <Link href="/">HOME</Link>
        <Link href="/missions">MISSION</Link>
        <Link href="/users">USER</Link>
      </div>
    </header>
  );
};
