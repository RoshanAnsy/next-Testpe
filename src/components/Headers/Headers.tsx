
import Link from "next/link";


export default function Header() {
    return (
      <div
        className=" bg-cyan-500 w-full text-white  px-4 flex flex-row justify-between items-center h-16"
      >
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flew-row items-end">

            <Link className="ml-2" href="/">
              Key Safe
            </Link>
          </div>
          <Link className="border p-2 rounded" href="/auth/login">
            Login
          </Link>
        </div>
      </div>
    );
  }
