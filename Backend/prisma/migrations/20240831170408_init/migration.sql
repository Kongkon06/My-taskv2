-- CreateTable
CREATE TABLE "Completion" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "todoId" INTEGER NOT NULL,
    "dailyTaskId" INTEGER,

    CONSTRAINT "Completion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dailytask" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "repeatDaily" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dailytask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Completion" ADD CONSTRAINT "Completion_dailyTaskId_fkey" FOREIGN KEY ("dailyTaskId") REFERENCES "Dailytask"("id") ON DELETE SET NULL ON UPDATE CASCADE;
