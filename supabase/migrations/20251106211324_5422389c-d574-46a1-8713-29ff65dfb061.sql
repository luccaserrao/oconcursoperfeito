-- Criar tabela de cache para recomendações de carreira
CREATE TABLE IF NOT EXISTS public.quiz_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answers_hash TEXT UNIQUE NOT NULL,
  recommendation JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  hit_count INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT quiz_cache_hit_count_check CHECK (hit_count >= 0)
);

-- Índice para busca rápida por hash
CREATE INDEX IF NOT EXISTS idx_quiz_cache_hash ON public.quiz_cache(answers_hash);

-- Índice para limpeza de cache antigo
CREATE INDEX IF NOT EXISTS idx_quiz_cache_created_at ON public.quiz_cache(created_at);

-- Comentários
COMMENT ON TABLE public.quiz_cache IS 'Cache de recomendações de carreira baseado em respostas idênticas';
COMMENT ON COLUMN public.quiz_cache.answers_hash IS 'Hash SHA-256 das respostas do quiz ordenadas';
COMMENT ON COLUMN public.quiz_cache.recommendation IS 'Recomendação completa em formato JSON';
COMMENT ON COLUMN public.quiz_cache.hit_count IS 'Número de vezes que este cache foi reutilizado';
COMMENT ON COLUMN public.quiz_cache.last_used_at IS 'Última vez que este cache foi acessado';

-- RLS: Apenas edge functions podem acessar (service role)
ALTER TABLE public.quiz_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage cache"
  ON public.quiz_cache
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);