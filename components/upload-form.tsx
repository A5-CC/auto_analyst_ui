"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  File,
  X,
  BarChart3,
  TrendingUp,
  Database,
  Brain
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface UploadFormProps {
  onUpload: (file: File) => void
  isUploading: boolean
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
]

const FILE_TYPE_LABELS = {
  "text/csv": "CSV",
  "application/vnd.ms-excel": "Excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Excel",
  "application/pdf": "PDF",
}

export function UploadForm({ onUpload, isUploading }: UploadFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds 5MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(1)}MB`
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only CSV, Excel (.xlsx, .xls), and PDF files are supported"
    }

    return null
  }

  const handleFileSelect = (file: File) => {
    setError(null)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)
  }

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setError(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header Section - Enterprise style */}
      <div className="text-center space-y-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Auto Analyst</h1>
          <p className="text-gray-600 mt-1.5">Transform your business data into actionable insights</p>
        </div>

        {/* Feature highlights - Enterprise style */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-2">
          <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            <BarChart3 className="h-3.5 w-3.5" />
            Automated Analytics
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            <TrendingUp className="h-3.5 w-3.5" />
            Executive Insights
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Instant Reports
          </Badge>
        </div>
      </div>

      {/* Upload Card */}
      <Card className="border transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 delay-300 shadow-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 text-lg font-medium">
            <FileText className="h-4 w-4 text-gray-600" />
            Upload Your Data File
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Upload your business data and get comprehensive analytics in seconds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!selectedFile ? (
            /* Upload Area */
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300",
                dragActive
                  ? "border-blue-500 bg-blue-50/80 scale-[1.02] shadow-lg"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50/80 group"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="space-y-4">
                <div
                  className={cn(
                    "mx-auto w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300",
                    dragActive ? "bg-blue-100 scale-110" : "bg-gray-100 group-hover:bg-gray-200"
                  )}
                >
                  <Upload
                    className={cn(
                      "h-7 w-7 transition-all duration-300",
                      dragActive ? "text-blue-600 scale-110" : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {dragActive ? "Drop your file here" : "Drag & drop your file here"}
                  </h3>
                  <p className="text-gray-600">or click to browse from your computer</p>
                </div>

                <div className="space-y-3">
                  {/* Primary file types */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary" className="text-sm py-1 px-3 bg-secondary/70">CSV</Badge>
                    <Badge variant="secondary" className="text-sm py-1 px-3 bg-secondary/70">Excel</Badge>
                    <Badge variant="secondary" className="text-sm py-1 px-3 bg-secondary/70">PDF</Badge>
                  </div>
                  {/* File size limit - subtle */}
                  <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
                </div>
              </div>

              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls,.pdf"
                onChange={handleInputChange}
                disabled={isUploading}
                className="hidden"
              />

              <Button
                asChild
                size="lg"
                className="mt-8 transition-transform hover:scale-105"
                disabled={isUploading}
              >
                <Label htmlFor="file-upload" className="cursor-pointer">
                  Select File
                </Label>
              </Button>
            </div>
          ) : (
            /* Selected File Display - Enhanced with better visual feedback */
            <div className="space-y-4 animate-in fade-in-0 duration-500">
              <div className="flex items-center justify-between p-5 bg-gray-50/80 rounded-lg border transition-colors hover:bg-gray-100/80">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <File className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-0.5">
                      <span>{formatFileSize(selectedFile.size)}</span>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs bg-secondary/50">
                        {FILE_TYPE_LABELS[selectedFile.type as keyof typeof FILE_TYPE_LABELS] || "Unknown"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  disabled={isUploading}
                  className="hover:bg-gray-200/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="flex-1 transition-all hover:scale-[1.02]"
                  size="lg"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Generating Analytics...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Generate Analytics
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRemoveFile}
                  disabled={isUploading}
                  size="lg"
                  className="hover:bg-gray-100/80"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="animate-in fade-in-0 zoom-in-95 duration-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
        <Card className="text-center p-5 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
          <div className="flex justify-center mb-3">
            <div className="p-2.5 bg-gray-100 rounded-lg">
              <Database className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <h3 className="font-semibold mb-1.5">1. Upload</h3>
          <p className="text-sm text-gray-600">Upload your CSV, Excel, or PDF file</p>
        </Card>

        <Card className="text-center p-5 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
          <div className="flex justify-center mb-3">
            <div className="p-2.5 bg-gray-100 rounded-lg">
              <Brain className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <h3 className="font-semibold mb-1.5">2. Analyze</h3>
          <p className="text-sm text-gray-600">AI automatically extracts insights</p>
        </Card>

        <Card className="text-center p-5 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
          <div className="flex justify-center mb-3">
            <div className="p-2.5 bg-gray-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <h3 className="font-semibold mb-1.5">3. Dashboard</h3>
          <p className="text-sm text-gray-600">Get actionable executive insights</p>
        </Card>
      </div>
    </div>
  )
}