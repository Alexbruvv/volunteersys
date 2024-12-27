CREATE TABLE "areas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"guidance_uri" varchar NOT NULL,
	"area_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedule_block_assignments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"schedule_block_id" uuid NOT NULL,
	"volunteer_id" uuid NOT NULL,
	"area" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedule_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedule_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"schedule_id" uuid NOT NULL,
	"schedule_block_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attendance_sheets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "volunteers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"badge_pronouns" varchar NOT NULL,
	"email" varchar NOT NULL,
	"cons_active_roles" integer NOT NULL,
	"cons_kit_knowledge" integer NOT NULL,
	"cons_long_shifts" integer NOT NULL,
	"cons_quiet_roles" integer NOT NULL,
	"cons_public_speaking" boolean NOT NULL,
	"cons_miss_finals" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_block_assignments" ADD CONSTRAINT "schedule_block_assignments_schedule_block_id_schedule_blocks_id_fk" FOREIGN KEY ("schedule_block_id") REFERENCES "public"."schedule_blocks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_block_assignments" ADD CONSTRAINT "schedule_block_assignments_volunteer_id_volunteers_id_fk" FOREIGN KEY ("volunteer_id") REFERENCES "public"."volunteers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_block_assignments" ADD CONSTRAINT "schedule_block_assignments_area_areas_id_fk" FOREIGN KEY ("area") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_slots" ADD CONSTRAINT "schedule_slots_schedule_id_schedules_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_slots" ADD CONSTRAINT "schedule_slots_schedule_block_id_schedule_blocks_id_fk" FOREIGN KEY ("schedule_block_id") REFERENCES "public"."schedule_blocks"("id") ON DELETE no action ON UPDATE no action;