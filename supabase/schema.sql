-- Database Schema for Celest Yoga
-- Designed for Supabase (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Poses Table: The core movement library
CREATE TABLE poses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sanskrit_name TEXT NOT NULL,
    english_name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    anatomical_focus TEXT[] NOT NULL, -- Array of body parts (e.g., ['hamstrings', 'lower_back'])
    safety_protocol TEXT NOT NULL,
    clinical_evidence TEXT, -- String or JSON describing clinical outcomes
    
    -- Accessibility & Modifications
    chair_modification_id UUID REFERENCES poses(id), -- Self-reference for chair version
    prop_substitutes JSONB NOT NULL DEFAULT '[]'::jsonb, -- e.g., [{"prop": "Block", "household": "Thick Book"}]
    modifications JSONB NOT NULL DEFAULT '{}'::jsonb, -- Radical accessibility data
    
    -- Metadata
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    estimated_duration_seconds INTEGER DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Props Table: For mapping professional props to household items
CREATE TABLE props (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    household_alternative TEXT,
    description TEXT,
    image_url TEXT
);

-- 3. User Sequences: Saved movement flows
CREATE TABLE user_sequences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- Reference to auth.users (Supabase Auth)
    title TEXT NOT NULL,
    description TEXT,
    pose_ids UUID[] NOT NULL, -- Array of pose IDs in order
    total_duration_minutes INTEGER,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. User Progress (Prana Level Tracker)
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    breath_score INTEGER DEFAULT 0, -- 0-100
    rest_score INTEGER DEFAULT 0,   -- 0-100
    movement_score INTEGER DEFAULT 0, -- 0-100
    total_prana_level INTEGER GENERATED ALWAYS AS ((breath_score + rest_score + movement_score) / 3) STORED,
    UNIQUE(user_id, date)
);

-- Indices for performance
CREATE INDEX idx_poses_anatomical_focus ON poses USING GIN (anatomical_focus);
CREATE INDEX idx_user_sequences_user_id ON user_sequences (user_id);
CREATE INDEX idx_user_progress_user_id_date ON user_progress (user_id, date);
