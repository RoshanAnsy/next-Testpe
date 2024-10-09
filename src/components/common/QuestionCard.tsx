"use client"

import { Button } from "../ui/button";
interface QuestionData {
  heading: string;
  description: string; 
  year:string
}

interface QuestionCardProps {
  data: QuestionData;
  onClick: () => void;
}
const QuestionCard = ({ data,onClick }:  QuestionCardProps ) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl cursor-pointer"
    onClick={onClick}
    >
      <a href="#">
        <h5
          className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl md:text-2xl"
          style={{ fontFamily: "New York" }}
        >
          {data?.heading}
        </h5>
      </a>
      <p
        className="mb-4 text-xs font-normal text-gray-700 dark:text-gray-400 sm:text-sm md:text-base lg:text-lg"
        style={{ fontFamily: "New York, serif" }}
      >
        {data?.description}
      </p>
      <div className="flex flex-row sm:items-center gap-4">
        <Button
          
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white  "
        >
          View
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Button>
        <span className="text-gray-500 dark:text-gray-400">{`year ${data?.year}`}</span>
      </div>
    </div>
  );
};

export default QuestionCard;
