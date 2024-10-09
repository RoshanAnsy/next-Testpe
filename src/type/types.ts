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