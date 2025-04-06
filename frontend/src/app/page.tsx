import Link from "next/link";

Link;
export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>
        <Link className="text-blue-900" href="/payments">
          Payments
        </Link>
      </p>
    </>
  );
}
