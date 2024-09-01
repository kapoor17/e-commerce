ALTER TABLE "order_items" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "totalAmount";