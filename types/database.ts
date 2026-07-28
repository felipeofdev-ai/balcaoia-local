export type ToneOfVoice =
  | "professional"
  | "friendly"
  | "premium"
  | "direct"
  | "consultive";

export type AttendanceGoal =
  | "quote"
  | "scheduling"
  | "sale"
  | "support"
  | "visit";

export type ProfileType =
  | "business_owner"
  | "freelancer"
  | "agency"
  | "marketer"
  | "curious";

export type PlanType = "free" | "basic" | "pro" | "agency";
export type WorkspaceStatus = "active" | "suspended" | "cancelled";

export type AssetType =
  | "profile_description"
  | "catalog"
  | "faq_knowledge_base"
  | "master_prompt"
  | "first_response_scripts"
  | "qualification_scripts"
  | "objection_scripts"
  | "followup_scripts"
  | "handoff_rules"
  | "implementation_checklist"
  | "freelancer_proposal"
  | "recommendation_scripts"
  | "implementation_plan"
  | "client_briefing";

export interface Profile {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: "user" | "admin";
  created_at: string;
}

export interface Workspace {
  id: string;
  owner_id: string;
  name: string;
  plan: PlanType;
  status: WorkspaceStatus;
  hotmart_buyer_email: string | null;
  hotmart_purchase_id: string | null;
  created_at: string;
}

export interface Business {
  id: string;
  workspace_id: string;
  name: string;
  segment: string | null;
  city: string | null;
  description: string | null;
  target_audience: string | null;
  tone_of_voice: ToneOfVoice;
  opening_hours: string | null;
  human_handoff_contact: string | null;
  wizard_completed: boolean;
  wizard_step: number;
  diagnostic_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface ProductService {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  price_range: string | null;
  benefits: string[] | null;
  requirements: string | null;
  delivery_time: string | null;
  active: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  business_id: string;
  question: string;
  answer: string;
  category: string | null;
  priority: number;
  created_at: string;
}

export interface Objection {
  id: string;
  business_id: string;
  objection: string;
  recommended_answer: string;
  category: string | null;
  created_at: string;
}

export interface GeneratedAsset {
  id: string;
  business_id: string;
  type: AssetType;
  title: string;
  content_markdown: string;
  model_used: string;
  version: number;
  created_at: string;
}

export interface LeadCapture {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  segment: string | null;
  profile_type: ProfileType | null;
  consent: boolean;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
}

export interface NicheTemplate {
  id: string;
  niche: string;
  suggested_faqs: unknown;
  suggested_objections: unknown;
  suggested_policies: unknown;
  suggested_tone: string | null;
  suggested_scripts: unknown;
  compliance_alerts: string[] | null;
  created_at: string;
}

export interface HotmartEvent {
  id: string;
  event_type: string;
  hottok_valid: boolean;
  buyer_email: string | null;
  buyer_name: string | null;
  product_id: string | null;
  purchase_id: string | null;
  raw_payload: unknown;
  processed_at: string | null;
  created_at: string;
}

export interface DiagnosticResult {
  id: string;
  lead_id: string | null;
  email: string | null;
  score: number;
  answers: Record<string, number>;
  bottlenecks: string[] | null;
  action_plan: string | null;
  created_at: string;
}
