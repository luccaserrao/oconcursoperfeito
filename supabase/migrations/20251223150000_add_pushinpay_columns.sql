-- Add PushinPay / PIX metadata to orders
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS pushinpay_transaction_id text,
  ADD COLUMN IF NOT EXISTS pushinpay_status text,
  ADD COLUMN IF NOT EXISTS pix_copy_paste text;

CREATE INDEX IF NOT EXISTS idx_orders_pushinpay_tx
  ON public.orders(pushinpay_transaction_id);
