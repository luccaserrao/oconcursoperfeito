-- Adicionar coluna para armazenar payment_id do Mercado Pago
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS mercado_pago_payment_id TEXT;

-- Criar índice para busca rápida
CREATE INDEX IF NOT EXISTS idx_orders_mp_payment_id 
ON orders(mercado_pago_payment_id);

-- Tornar stripe_session_id opcional (já que não usaremos mais Stripe)
ALTER TABLE orders 
ALTER COLUMN stripe_session_id DROP NOT NULL;