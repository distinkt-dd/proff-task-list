/*
  Warnings:

  - The values [COMPLETE,INCOMPLETE] on the enum `StatusEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "PriorityEnum" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterEnum
BEGIN;
CREATE TYPE "StatusEnum_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE');
ALTER TABLE "public"."tasks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tasks" ALTER COLUMN "status" TYPE "StatusEnum_new" USING ("status"::text::"StatusEnum_new");
ALTER TYPE "StatusEnum" RENAME TO "StatusEnum_old";
ALTER TYPE "StatusEnum_new" RENAME TO "StatusEnum";
DROP TYPE "public"."StatusEnum_old";
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "due_date" TIMESTAMP(3),
ADD COLUMN     "priority" "PriorityEnum" NOT NULL DEFAULT 'MEDIUM',
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "tasks_user_id_deleted_at_idx" ON "tasks"("user_id", "deleted_at");

-- CreateIndex
CREATE INDEX "tasks_user_id_status_idx" ON "tasks"("user_id", "status");

-- CreateIndex
CREATE INDEX "tasks_user_id_priority_idx" ON "tasks"("user_id", "priority");
