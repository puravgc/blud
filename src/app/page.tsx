import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-fit pt-10">
      <div className="flex h-full">
        <div className="w-1/2  flex flex-col justify-start items-center pt-44">
          <div>
            <h1 className="text-6xl font-bold text-red-600">
              SHARE LIFE,
              <br /> DONATE BLOOD
            </h1>
            <p className="text-lg text-gray-500 mt-4">
              One small act of kindness can make a world of difference.
            </p>
            <div className=" flex justify-start items-center w-full pt-5">
              <Link href="/donate">
                <Button className=" px-8 py-6 bg-white text-red-500 border border-red-500 font-bold rounded-none shadow-lg hover:bg-red-500 hover:text-white transition duration-300">
                  DONATE NOW!
                </Button>
              </Link>

              <Button className=" uppercase px-8 py-6 bg-white text-red-500 border border-red-500 font-bold rounded-none shadow-lg hover:bg-red-500 hover:text-white transition duration-300 ml-5">
                Request for Blood Donation
              </Button>
            </div>
            <div className="flex justify-start items-center pt-6 gap-7">
              <FaFacebook className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
              <FaSquareInstagram className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
              <FaTwitter className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <Image
            src="/homebanner.png"
            alt="Blood Donation"
            width={600}
            height={600}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
