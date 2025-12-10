CREATE TABLE "certifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resume_id" uuid,
	"name" text NOT NULL,
	"issuer" text NOT NULL,
	"issue_date" text,
	"expiry_date" text,
	"credential_id" text,
	"credential_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resume_id" uuid,
	"institution" text NOT NULL,
	"degree" text NOT NULL,
	"field" text,
	"start_date" text,
	"end_date" text,
	"gpa" text,
	"description" text,
	"location" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resume_id" uuid,
	"category" text NOT NULL,
	"items" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "resumes" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "resumes" ADD COLUMN "linkedin" text;--> statement-breakpoint
ALTER TABLE "resumes" ADD COLUMN "website" text;--> statement-breakpoint
ALTER TABLE "resumes" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "resumes" ADD COLUMN "template_id" text DEFAULT 'professional-1';--> statement-breakpoint
ALTER TABLE "resumes" ADD COLUMN "template_config" jsonb;--> statement-breakpoint
ALTER TABLE "resumes" ADD COLUMN "section_order" jsonb;--> statement-breakpoint
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;