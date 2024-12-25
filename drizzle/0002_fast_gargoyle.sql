ALTER TABLE "users" RENAME COLUMN "email_address" TO "primary_email";--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "email_address" varchar(255) NOT NULL;