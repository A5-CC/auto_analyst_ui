import { DashboardData } from "@/components/analytics/types"
import { UploadResponse, JobStatus, DocMeta } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchWithError(url: string, options?: RequestInit): Promise<Response> {
  const response = await fetch(url, options)

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new ApiError(response.status, errorText)
  }

  return response
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetchWithError(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  })

  return response.json()
}

export async function checkJobStatus(jobId: string): Promise<JobStatus> {
  const response = await fetchWithError(`${API_BASE_URL}/status/${jobId}`)
  return response.json()
}

export async function getDocumentList(): Promise<DocMeta[]> {
  const response = await fetchWithError(`${API_BASE_URL}/list`)
  return response.json()
}

export async function getSummary(url: string): Promise<DashboardData> {
  const response = await fetchWithError(url)
  return response.json()
}

export async function getSummaryById(docId: string): Promise<DashboardData> {
  const response = await fetchWithError(`${API_BASE_URL}/summary/${docId}`)
  return response.json()
}