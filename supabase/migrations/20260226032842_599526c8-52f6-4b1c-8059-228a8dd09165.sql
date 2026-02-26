
CREATE TABLE public.email_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  source TEXT
);

CREATE UNIQUE INDEX email_submissions_email_unique ON public.email_submissions (email);

ALTER TABLE public.email_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.email_submissions
  FOR INSERT WITH CHECK (true);

CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on rate_limits" ON public.rate_limits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous select on rate_limits" ON public.rate_limits
  FOR SELECT USING (true);

CREATE INDEX rate_limits_ip_created_idx ON public.rate_limits (ip_address, created_at);
