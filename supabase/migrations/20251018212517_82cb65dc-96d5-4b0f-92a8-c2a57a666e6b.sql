-- Fix RLS policies to protect customer data

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Service role can view all responses" ON quiz_responses;
DROP POLICY IF EXISTS "Service role can update orders" ON orders;

-- Create secure SELECT policy for quiz_responses (service role only)
CREATE POLICY "Service role can view all responses" 
ON quiz_responses 
FOR SELECT 
USING (auth.role() = 'service_role'::text);

-- Create secure SELECT policy for orders (service role only)
CREATE POLICY "Service role can view orders" 
ON orders 
FOR SELECT 
USING (auth.role() = 'service_role'::text);

-- Create secure UPDATE policy for orders (service role only)
CREATE POLICY "Service role can update orders" 
ON orders 
FOR UPDATE 
USING (auth.role() = 'service_role'::text);