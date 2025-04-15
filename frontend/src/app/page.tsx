import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="px-5">
        <h1 className="my-5 text-[30px] text-center font-medium">Home</h1>
        <Button type="submit" className="w-full md:w-[250px]">
          <Link className="text-white" href="/payments">
            Make Your payment here
          </Link>
        </Button>
      </div>
    </div>
  );
}
