-- CreateTable
CREATE TABLE "vote" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "voting_choice" BOOLEAN NOT NULL,
    "casted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "bord" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "url" TEXT[],
    "heading" TEXT,
    "description" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
