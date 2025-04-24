import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={`text-center space-y-6 pt-10`}>
        <h1 className={`headingLg`}>DO MISSIONとは</h1>
        <p>
          何かを習得する上で努力を習慣化することは簡単ではありません。
          <br />
          DO MISSIONは努力の可視化を目的としたサービスです。
        </p>
        <div>
          <Link href="/" className={`link`}>
            ← 戻る
          </Link>
        </div>
      </div>
    </>
  );
}
