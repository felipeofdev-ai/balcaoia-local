-- BalcãoIA Local — Schema inicial
-- EXTENSÕES
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- PROFILES
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text,
  email text not null,
  phone text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

-- WORKSPACES
create table workspaces (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  plan text not null default 'free' check (plan in ('free', 'basic', 'pro', 'agency')),
  status text not null default 'active' check (status in ('active', 'suspended', 'cancelled')),
  hotmart_buyer_email text,
  hotmart_purchase_id text,
  created_at timestamptz default now()
);

-- BUSINESSES
create table businesses (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references workspaces(id) on delete cascade not null,
  name text not null,
  segment text,
  city text,
  description text,
  target_audience text,
  tone_of_voice text default 'friendly'
    check (tone_of_voice in ('professional','friendly','premium','direct','consultive')),
  opening_hours text,
  human_handoff_contact text,
  wizard_completed boolean default false,
  wizard_step integer default 1,
  diagnostic_score integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- PRODUCTS / SERVICES
create table products_services (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  name text not null,
  description text,
  price_range text,
  benefits text[],
  requirements text,
  delivery_time text,
  active boolean default true,
  created_at timestamptz default now()
);

-- FAQS
create table faqs (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  question text not null,
  answer text not null,
  category text,
  priority integer default 0,
  created_at timestamptz default now()
);

-- OBJECTIONS
create table objections (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  objection text not null,
  recommended_answer text not null,
  category text,
  created_at timestamptz default now()
);

-- BUSINESS POLICIES
create table business_policies (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  policy_type text not null,
  content text not null,
  created_at timestamptz default now()
);

-- GENERATED ASSETS
create table generated_assets (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  type text not null check (type in (
    'profile_description','catalog','faq_knowledge_base',
    'master_prompt','first_response_scripts','qualification_scripts',
    'objection_scripts','followup_scripts','handoff_rules',
    'implementation_checklist','freelancer_proposal','recommendation_scripts',
    'implementation_plan','client_briefing'
  )),
  title text not null,
  content_markdown text not null,
  model_used text default 'mock',
  version integer default 1,
  created_at timestamptz default now()
);

-- LEAD CAPTURES
create table lead_captures (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  segment text,
  profile_type text check (profile_type in ('business_owner','freelancer','agency','marketer','curious')),
  consent boolean not null default false,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz default now()
);

-- DIAGNOSTIC RESULTS
create table diagnostic_results (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references lead_captures(id),
  email text,
  score integer not null,
  answers jsonb not null,
  bottlenecks text[],
  action_plan text,
  created_at timestamptz default now()
);

-- HOTMART EVENTS
create table hotmart_events (
  id uuid default uuid_generate_v4() primary key,
  event_type text not null,
  hottok_valid boolean default false,
  buyer_email text,
  buyer_name text,
  product_id text,
  purchase_id text,
  raw_payload jsonb,
  processed_at timestamptz,
  created_at timestamptz default now()
);

-- CHANNEL INTEGRATIONS
create table channel_integrations (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references workspaces(id) on delete cascade not null,
  type text not null check (type in ('manual_export','simulator','webchat','whatsapp_cloud_api')),
  provider text,
  credentials_encrypted text,
  status text default 'inactive' check (status in ('active','inactive','error')),
  created_at timestamptz default now()
);

-- CONVERSATIONS
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  channel text not null,
  customer_name text,
  customer_phone_hash text,
  status text default 'open' check (status in ('open','closed','human_required')),
  human_required boolean default false,
  created_at timestamptz default now()
);

-- MESSAGES
create table messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations(id) on delete cascade not null,
  direction text not null check (direction in ('inbound','outbound')),
  content text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

-- CONSENT RECORDS
create table consent_records (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references lead_captures(id),
  channel text,
  consent_text text,
  ip text,
  user_agent text,
  created_at timestamptz default now()
);

-- AUDIT LOGS
create table audit_logs (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid,
  actor_id uuid,
  action text not null,
  entity text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

-- NICHE TEMPLATES
create table niche_templates (
  id uuid default uuid_generate_v4() primary key,
  niche text not null unique,
  suggested_faqs jsonb,
  suggested_objections jsonb,
  suggested_policies jsonb,
  suggested_tone text,
  suggested_scripts jsonb,
  compliance_alerts text[],
  created_at timestamptz default now()
);

-- AFFILIATE ASSETS
create table affiliate_assets (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  type text not null,
  content text not null,
  status text default 'published',
  created_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table workspaces enable row level security;
alter table businesses enable row level security;
alter table products_services enable row level security;
alter table faqs enable row level security;
alter table objections enable row level security;
alter table business_policies enable row level security;
alter table generated_assets enable row level security;
alter table channel_integrations enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

create policy "users_own_profile" on profiles
  for all using (auth.uid() = id);

create policy "users_own_workspaces" on workspaces
  for all using (auth.uid() = owner_id);

create policy "users_own_businesses" on businesses
  for all using (
    workspace_id in (select id from workspaces where owner_id = auth.uid())
  );

create policy "users_own_products" on products_services
  for all using (
    business_id in (
      select b.id from businesses b
      join workspaces w on b.workspace_id = w.id
      where w.owner_id = auth.uid()
    )
  );

create policy "users_own_faqs" on faqs
  for all using (
    business_id in (
      select b.id from businesses b
      join workspaces w on b.workspace_id = w.id
      where w.owner_id = auth.uid()
    )
  );

create policy "users_own_objections" on objections
  for all using (
    business_id in (
      select b.id from businesses b
      join workspaces w on b.workspace_id = w.id
      where w.owner_id = auth.uid()
    )
  );

create policy "users_own_assets" on generated_assets
  for all using (
    business_id in (
      select b.id from businesses b
      join workspaces w on b.workspace_id = w.id
      where w.owner_id = auth.uid()
    )
  );

create policy "users_own_policies" on business_policies
  for all using (
    business_id in (
      select b.id from businesses b
      join workspaces w on b.workspace_id = w.id
      where w.owner_id = auth.uid()
    )
  );

create policy "users_own_channels" on channel_integrations
  for all using (
    workspace_id in (select id from workspaces where owner_id = auth.uid())
  );

create policy "users_own_conversations" on conversations
  for all using (
    business_id in (
      select b.id from businesses b
      join workspaces w on b.workspace_id = w.id
      where w.owner_id = auth.uid()
    )
  );

create policy "users_own_messages" on messages
  for all using (
    conversation_id in (
      select c.id from conversations c
      join businesses b on c.business_id = b.id
      join workspaces w on b.workspace_id = w.id
      where w.owner_id = auth.uid()
    )
  );

-- Trigger: criar profile ao cadastrar
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Nichos iniciais
insert into niche_templates (niche, suggested_tone, compliance_alerts) values
  ('Estética', 'friendly', ARRAY['Não fazer diagnósticos de pele/saúde', 'Não prometer resultados garantidos']),
  ('Salão de Beleza', 'friendly', ARRAY['Não prometer resultado de coloração sem avaliação']),
  ('Petshop', 'friendly', ARRAY['Não dar diagnóstico veterinário', 'Orientar sempre consultar veterinário']),
  ('Clínica', 'professional', ARRAY['Nunca dar diagnóstico médico', 'Sempre orientar consulta presencial', 'Não prometer cura']),
  ('Delivery', 'direct', ARRAY['Informar prazos reais', 'Não prometer entrega garantida sem confirmar']),
  ('Academia', 'friendly', ARRAY['Não prescrever dieta ou treino sem avaliação', 'Orientar avaliação física']),
  ('Escola/Curso Local', 'friendly', ARRAY['Não garantir aprovação', 'Informar carga horária real']),
  ('Consultoria', 'consultive', ARRAY['Não garantir resultado financeiro', 'Deixar claro que é orientação, não assessoria jurídica/contábil']),
  ('Assistência Técnica', 'direct', ARRAY['Não garantir reparo sem diagnóstico presencial', 'Informar prazo real']),
  ('Imobiliária', 'professional', ARRAY['Não garantir financiamento', 'Não prometer valorização', 'Verificar regulatório CRECI']);
