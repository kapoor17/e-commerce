ALTER TABLE "cart_items" ALTER COLUMN "cartId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ALTER COLUMN "productId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_unique" UNIQUE("userId");