export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'VIEWER';
  metadata?: { name?: string; [key: string]: unknown };
  created_at?: string;
  last_login_at?: string;
}

export interface Document {
  id: string;
  document_id?: string;
  original_filename: string;
  file_size_bytes: number;
  file_type: string;
  status: 'uploaded' | 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  error_message?: string;
  result?: {
    extracted_text?: string;
    entities?: Array<{ type: string; value: string; confidence?: number }>;
    summary?: string;
    metadata?: Record<string, unknown>;
    processing_time_ms?: number;
  };
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface ApiKeyRecord {
  id: string;
  name: string;
  prefix: string;
  scopes: string[];
  rateLimitPerDay: number;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export interface Stats {
  total_documents: number;
  total_size_bytes: number;
  average_progress: number;
}

export interface PaginatedDocuments {
  documents: Document[];
  total: number;
  limit: number;
  offset: number;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  user: User;
  api_key?: string;
}
