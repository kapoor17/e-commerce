ALTER TABLE "carts" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "productId" SET NOT NULL;