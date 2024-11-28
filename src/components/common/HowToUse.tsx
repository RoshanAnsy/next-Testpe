import Image from 'next/image';



const HowToUse = () => {
  return (
    <div className="flex flex-col sm:gap-y-10 justify-center items-center sm:mx-auto sm:flex m-6 mx-4 sm:m-12">
      {/* Displaying an image */}
      <Image
        src="https://res.cloudinary.com/dxgkczwho/image/upload/v1732800924/Htu_dno5ln.png"
        className=" shadow-sm rounded-xl"
        alt="how to use"
        width={1000}
        height={500}
        priority // Ensures the image is loaded eagerly
      />
      <Image
        src="https://res.cloudinary.com/dxgkczwho/image/upload/v1732800827/aibanner_xlsqef.png"
        className="rounded-xl"
        alt="how to use"
        width={1000}
        height={500}
        priority // Ensures the image is loaded eagerly
      />
    </div>
  );
};

import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";

const AiTest = () => {
  return (
    <div className="flex flex-col gap-y-6 text-lg justify-center items-center mx-auto my-6 p-6 bg-white shadow-lg rounded-lg max-w-[90%] sm:max-w-[60%]">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        AI Questions Generator
      </h1>
      <h2 className="text-xl sm:text-2xl font-mono mb-6 text-center">
        Generate your question paper within{" "}
        <span className="text-blue-500 font-semibold">10</span> seconds
      </h2>
      <ul className="list-disc ml-6 sm:ml-8 flex flex-col gap-y-2 mb-4 text-base sm:text-lg">
        <li>Download your paper</li>
        <li>Take a test and get an instant score for your test</li>
      </ul>
      <Button>
        <a
          href="https://project.testpe.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-x-4"
        >
          <FaArrowRightLong size={24} />
          <span>Generate Paper</span>
        </a>
      </Button>
    </div>
  );
};



export  { HowToUse, AiTest};
