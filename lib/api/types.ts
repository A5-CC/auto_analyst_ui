// API Types
export interface UploadResponse {
  job_id: string
}

export interface JobStatus {
  state: 'processing' | 'done' | 'error'
  url?: string
  error?: string
}

export interface DocMeta {
  id: string
  title: string
  created_at: string
}

export type AppMode = 'idle' | 'uploading' | 'processing' | 'done' | 'error'