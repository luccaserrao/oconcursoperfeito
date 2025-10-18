-- Remove the overly permissive SELECT policy on orders table
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Orders table should NOT be readable from client-side
-- All order reading should happen through edge functions using service role key
-- This protects customer payment information (emails, names, amounts, payment IDs)

COMMENT ON TABLE public.orders IS 'Customer payment data - accessible only via backend functions with service role key';