import { QuestionData } from "@/type/types";
import semester from "../../../public/assects/semster.jpg"

export const universityData = [
    { value: "beu", label: "BEU" },
    { value: "aku", label: "AKU" },
    { value: "cbse", label: "CBSE" },
  ];
  
  export const yearData = [
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];
  
  export const semesterData = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
  ];
  
  export const staticData: QuestionData[] = [
    { heading: "5-th sem cse pepper", description: "this is just random data",thumbnail:semester, year: "2022", id: 1 },
    { heading: "5-th sem cse pepper", description: "this is just random data",thumbnail:semester, year: "2022", id: 2 },
  ];