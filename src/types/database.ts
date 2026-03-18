export type AnatomicalFocus = 
  | 'hamstrings' 
  | 'lower_back' 
  | 'shoulders' 
  | 'hips' 
  | 'core' 
  | 'spine' 
  | 'neck' 
  | 'wrists' 
  | 'ankles';

export interface PropSubstitute {
  prop: string;
  household: string;
}

export interface Pose {
  id: string;
  sanskrit_name: string;
  english_name: string;
  slug: string;
  anatomical_focus: AnatomicalFocus[];
  safety_protocol: string;
  clinical_evidence?: string;
  chair_modification_id?: string;
  prop_substitutes: PropSubstitute[];
  modifications: {
    chair?: string;
    wall?: string;
    bariatric?: string;
    trauma_informed?: string;
  };
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  estimated_duration_seconds: number;
  image_url?: string;
  image_prompt?: string;
}

export interface UserSequence {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  pose_ids: string[];
  total_duration_minutes: number;
  is_public: boolean;
  created_at: string;
}

export interface PranaLevel {
  breath: number;
  rest: number;
  movement: number;
  total: number;
}
