"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

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
    thumbnail?:File |  null | any; 

  };


  export interface QuestionData {
    heading: string;
    description: string;
    year: string;
    id: number;
    thumbnail?: string | any;
    
  }
  
  export interface ViewQuestion {
    bord: string;
    branch: string;
    year: string;
    semester: string;
    subject: string;
    images: string[];
  }