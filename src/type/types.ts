"use client"

export type Inputs = {
    bord: string;
    semester: string;
    year: string;
    exampleRequired: string;
    subject:string;
    heading?:string;
    description?:string;
    branch?:string
    files?:File | null;

  };


  export interface QuestionData {
    heading: string;
    description: string;
    year: string;
    id: number;
    
  }
  
  export interface ViewQuestion {
    bord: string;
    branch: string;
    year: string;
    semester: string;
    subject: string;
    url: string[];
  }