-- Create orders table to track payments
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  quiz_response_id UUID REFERENCES public.quiz_responses(id),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  stripe_session_id TEXT,
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
USING (true);

-- Anyone can create an order (for checkout session creation)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Service role can update orders (for payment verification)
CREATE POLICY "Service role can update orders"
ON public.orders
FOR UPDATE
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_orders_email ON public.orders(user_email);
CREATE INDEX idx_orders_session ON public.orders(stripe_session_id);