"use client"

import { useState, useEffect } from "react"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import { DashboardData } from "@/components/analytics/types"
import { AppMode, DocMeta } from "@/lib/api/types"
import { uploadFile, checkJobStatus, getDocumentList, getSummary, getSummaryById, ApiError } from "@/lib/api/client"

export default function Page() {
  const [mode, setMode] = useState<AppMode>('idle')
  const [jobId, setJobId] = useState<string | null>(null)
  const [summary, setSummary] = useState<DashboardData | null>(null)
  const [history, setHistory] = useState<DocMeta[]>([])
  const [currentFileName, setCurrentFileName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  // Load history on mount
  useEffect(() => {
    loadHistory()
  }, [])

  // Polling effect for job status
  useEffect(() => {
    if (mode !== 'processing' || !jobId) return

    let timeoutCount = 0
    const maxTimeouts = 60 // 2 minutes at 2s intervals

    const poll = async () => {
      try {
        const status = await checkJobStatus(jobId)

        if (status.state === 'done' && status.url) {
          const summaryData = await getSummary(status.url)
          setSummary(summaryData)
          setMode('done')
          clearInterval(interval)
          // Refresh history to include new document
          loadHistory()
        } else if (status.state === 'error') {
          setError(status.error || 'Processing failed')
          setMode('error')
          clearInterval(interval)
        }
        // Continue polling if still processing
      } catch (err) {
        console.error('Polling error:', err)
        timeoutCount++

        if (timeoutCount >= maxTimeouts) {
          setError('Processing timeout - please try again')
          setMode('error')
          clearInterval(interval)
        }
      }
    }

    // Start polling every 2 seconds
    const interval = setInterval(poll, 2000)

    // Initial poll
    poll()

    return () => clearInterval(interval)
  }, [mode, jobId])

  const loadHistory = async () => {
    try {
      const docs = await getDocumentList()
      setHistory(docs)
    } catch (err) {
      console.warn('Backend not available - history loading disabled:', err)
      // Don't set error state, just silently fail for now
      // This allows development without backend
    }
  }

  const handleUpload = async (file: File) => {
    setError(null)
    setMode('uploading')
    setCurrentFileName(file.name)

    try {
      const response = await uploadFile(file)
      setJobId(response.job_id)
      setMode('processing')
    } catch (err) {
      console.error('Upload failed:', err)
      if (err instanceof ApiError) {
        setError(`Upload failed: ${err.message}`)
      } else {
        setError('Upload failed - please try again')
      }
      setMode('error')
    }
  }

  const handleHistorySelect = async (docId: string) => {
    setError(null)
    setMode('uploading') // Show loading state

    try {
      const summaryData = await getSummaryById(docId)
      setSummary(summaryData)
      setMode('done')
    } catch (err) {
      console.error('Failed to load summary:', err)
      if (err instanceof ApiError) {
        setError(`Failed to load document: ${err.message}`)
      } else {
        setError('Failed to load document - please try again')
      }
      setMode('error')
    }
  }

  const handleCancel = () => {
    setMode('idle')
    setJobId(null)
    setCurrentFileName('')
    setError(null)
  }

  const handleReset = () => {
    setMode('idle')
    setJobId(null)
    setSummary(null)
    setCurrentFileName('')
    setError(null)
  }

  return (
    <AnalyticsDashboard
      mode={mode}
      summary={summary}
      history={history}
      currentFileName={currentFileName}
      error={error}
      onUpload={handleUpload}
      onHistorySelect={handleHistorySelect}
      onCancel={handleCancel}
      onReset={handleReset}
    />
  )
}
