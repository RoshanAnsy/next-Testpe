"use client";

import Image from "next/image";

interface QuestionData {
  heading: string;
  description: string;
  year: string;
  thumbnail?: string;
}

interface QuestionCardProps {
  data: QuestionData;
  onClick: () => void;
}

const QuestionCard = ({ data, onClick }: QuestionCardProps) => {
  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl cursor-pointer"
      onClick={onClick}
    >
      {/* Wrapper with 16:9 aspect ratio */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <Image
          className="absolute top-0 left-0 w-full h-full rounded-t-md object-cover"
          src={data?.thumbnail as string}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          quality={100}
          placeholder="blur"
          blurDataURL="/path-to-blur-image.jpg"
        />
      </div>

      <div className="px-5 pb-5">
        <h5
          className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl md:text-2xl"
          style={{ fontFamily: "New York" }}
        >
          {data?.heading}
        </h5>
        <p
          className="mb-4 text-xs font-normal text-gray-700 dark:text-gray-400 sm:text-sm md:text-base lg:text-lg"
          style={{ fontFamily: "New York, serif" }}
        >
          {data?.description}
        </p>
        
      </div>
    </div>
  );
};

export default QuestionCard;
