import { useState, useEffect, useRef } from 'react'
import { marked } from 'marked'
import SearchIcon from '@mui/icons-material/Search'
import DescriptionIcon from '@mui/icons-material/Description'
import FolderIcon from '@mui/icons-material/Folder'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import CodeIcon from '@mui/icons-material/Code'
import ArticleIcon from '@mui/icons-material/Article'
import DataObjectIcon from '@mui/icons-material/DataObject'
import RefreshIcon from '@mui/icons-material/Refresh'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'
import CategoryIcon from '@mui/icons-material/Category'
import GroupIcon from '@mui/icons-material/Group'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import './App.css'

interface SearchResult {
  id: string
  filename: string
  preview: string
  category?: string
  project?: string
  team?: string
  tags?: string[]
  modifiedAt: string
}

interface Stats {
  totalDocuments: number
  categories: string[]
  teams: string[]
  projects: string[]
}

interface Document {
  id: string
  filename: string
  path?: string
  category?: string
  team?: string
  project?: string
  size?: number
  modified_at?: string
}

interface Snackbar {
  message: string
  type: 'success' | 'error' | 'info'
}

interface DocumentDetail {
  id: string
  filename: string
  content: string
  url: string
  category?: string
  team?: string
  project?: string
  tags?: string[]
  size: number
  modified_at: string
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [backendStatus, setBackendStatus] = useState<string>('checking...')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const [indexing, setIndexing] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])
  const [snackbar, setSnackbar] = useState<Snackbar | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<DocumentDetail | null>(null)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [infoDocument, setInfoDocument] = useState<Document | null>(null)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchMode, setSearchMode] = useState<'suggestions' | 'full'>('suggestions')
  const [dragOver, setDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadingFileName, setUploadingFileName] = useState<string>('')
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [loadingDocId, setLoadingDocId] = useState<string | null>(null)
  const [copiedUrl, setCopiedUrl] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileName = (fullPath: string) => {
    // Extract just the filename from the path
    return fullPath.split('\\').pop()?.split('/').pop() || fullPath
  }

  const getFileIcon = (filename: string) => {
    const ext = filename.toLowerCase().split('.').pop()
    switch (ext) {
      case 'pdf':
        return <PictureAsPdfIcon sx={{ color: '#ef4444' }} />
      case 'docx':
      case 'doc':
        return <ArticleIcon sx={{ color: '#2563eb' }} />
      case 'md':
        return <ArticleIcon sx={{ color: '#8b5cf6' }} />
      case 'html':
        return <CodeIcon sx={{ color: '#f97316' }} />
      case 'json':
        return <DataObjectIcon sx={{ color: '#10b981' }} />
      case 'txt':
        return <DescriptionIcon sx={{ color: '#6b7280' }} />
      default:
        return <DescriptionIcon sx={{ color: '#6b7280' }} />
    }
  }

  const highlightKeywords = (text: string) => {
    if (!searchQuery) return text

    const keywords = searchQuery.toLowerCase().split(' ').filter(k => k.length > 2)
    let highlighted = text

    keywords.forEach((keyword, index) => {
      const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981']
      const color = colors[index % colors.length]
      const regex = new RegExp(`(${keyword})`, 'gi')
      highlighted = highlighted.replace(regex, `<mark style="background: ${color}; color: white; padding: 0.1rem 0.3rem; border-radius: 3px;">$1</mark>`)
    })

    return highlighted
  }

  const handleDocumentClick = async (docId: string) => {
    setLoadingPreview(true)
    setLoadingDocId(docId)
    setSelectedDocument(null) // Clear previous document
    setSearchMode('suggestions') // Reset search mode to show document preview
    
    try {
      // Fetch full document details
      const allDocs = await fetch('/api/documents').then(r => r.json())
      const doc = allDocs.documents.find((d: any) => d.id === docId)
      
      if (doc) {
        // Get the full document with content from search results or fetch separately
        const searchRes = await fetch(`/api/search?q=${encodeURIComponent(getFileName(doc.filename))}`)
        const searchData = await searchRes.json()
        const fullDoc = searchData.results.find((r: any) => r.id === docId)
        
        if (fullDoc) {
          setSelectedDocument({
            id: fullDoc.id,
            filename: getFileName(doc.filename),
            content: fullDoc.preview,
            url: doc.filename, // This is the Cloudinary URL stored in the database
            category: fullDoc.category,
            team: fullDoc.team,
            project: fullDoc.project,
            tags: fullDoc.tags,
            size: doc.size,
            modified_at: doc.modified_at
          })
        }
      }
    } catch (error) {
      console.error('Error loading document:', error)
      showSnackbar('Failed to load document', 'error')
    } finally {
      setLoadingPreview(false)
      setLoadingDocId(null)
    }
  }

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setSnackbar({ message, type })
    setTimeout(() => setSnackbar(null), 5000)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedUrl(true)
      showSnackbar('URL copied to clipboard!', 'success')
      setTimeout(() => setCopiedUrl(false), 2000)
    } catch (error) {
      showSnackbar('Failed to copy URL', 'error')
    }
  }

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return
    }

    try {
      const res = await fetch(`/api/documents/${docId}`, {
        method: 'DELETE'
      })
      const data = await res.json()

      if (data.success) {
        showSnackbar('Document deleted successfully', 'success')
        setShowInfoModal(false)
        setSelectedDocument(null)
        await loadData()
      } else {
        showSnackbar(`Delete failed: ${data.message}`, 'error')
      }
    } catch (error) {
      console.error('Delete error:', error)
      showSnackbar('Failed to delete document', 'error')
    }
  }

  const handleClearAllDocuments = async () => {
    if (!confirm('Are you sure you want to delete ALL documents? This cannot be undone!')) {
      return
    }

    try {
      const res = await fetch('/api/documents', {
        method: 'DELETE'
      })
      const data = await res.json()

      if (data.success) {
        showSnackbar('All documents deleted successfully', 'success')
        await loadData()
      } else {
        showSnackbar(`Clear failed: ${data.message}`, 'error')
      }
    } catch (error) {
      console.error('Clear all error:', error)
      showSnackbar('Failed to clear documents', 'error')
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const toggleTeam = (team: string) => {
    setExpandedTeam(expandedTeam === team ? null : team)
  }

  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const healthRes = await fetch('/api/health')
      const healthData = await healthRes.json()
      setBackendStatus(`${healthData.documentsIndexed} documents indexed`)
      
      const statsRes = await fetch('/api/stats')
      const statsData = await statsRes.json()
      setStats(statsData)
      
      // Load actual documents list
      const docsRes = await fetch('/api/documents')
      const docsData = await docsRes.json()
      setDocuments(docsData.documents || [])
    } catch (error) {
      setBackendStatus('Backend not running')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleIndex = async () => {
    setIndexing(true)
    try {
      const res = await fetch('/api/index', { method: 'POST' })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      
      if (data.success) {
        showSnackbar('Indexing started! This may take 30-60 seconds.', 'info')
        
        // Poll for updates every 3 seconds
        const pollInterval = setInterval(async () => {
          try {
            const statsRes = await fetch('/api/stats')
            const statsData = await statsRes.json()
            
            if (statsData.totalDocuments > 0) {
              clearInterval(pollInterval)
              await loadData()
              setIndexing(false)
              showSnackbar(`Indexing complete! ${statsData.totalDocuments} documents indexed.`, 'success')
            }
          } catch (error) {
            console.error('Polling error:', error)
          }
        }, 3000)
        
        // Stop polling after 2 minutes
        setTimeout(() => {
          clearInterval(pollInterval)
          setIndexing(false)
        }, 120000)
      } else {
        showSnackbar(data.message || 'Indexing failed', 'error')
        setIndexing(false)
      }
    } catch (error) {
      console.error('Indexing error:', error)
      showSnackbar(`Indexing failed: ${error}`, 'error')
      setIndexing(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    await uploadFiles(files)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      await uploadFiles(Array.from(files))
    }
  }

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return

    setIndexing(true)
    setUploadProgress(0)
    
    try {
      const totalFiles = files.length
      let processedFiles = 0

      for (const file of files) {
        setUploadingFileName(file.name)
        setUploadProgress(Math.round((processedFiles / totalFiles) * 100))

        const formData = new FormData()
        formData.append('files', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        const data = await res.json()

        if (!data.success) {
          showSnackbar(`Failed to upload ${file.name}: ${data.message}`, 'error')
        }

        processedFiles++
        setUploadProgress(Math.round((processedFiles / totalFiles) * 100))
      }

      showSnackbar(`Successfully uploaded ${processedFiles} file(s)`, 'success')
      await loadData()
    } catch (error) {
      console.error('Upload error:', error)
      showSnackbar('Upload failed. Please try again.', 'error')
    } finally {
      setIndexing(false)
      setUploadProgress(0)
      setUploadingFileName('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }



  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.results)
    } catch (error) {
      console.error('Search failed:', error)
      showSnackbar('Search failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Debounced search as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery)
      } else {
        setResults([])
      }
    }, 300) // Wait 300ms after user stops typing

    return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span>Knowledge Search</span>
        </div>
        <div className="navbar-status">{backendStatus}</div>
      </nav>

      {/* Search Bar */}
      <div className="search-bar">
        <form 
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault()
            if (searchQuery.trim()) {
              setSearchMode('full')
              setSelectedDocument(null)
              setSearchFocused(false)
            }
          }}
        >
          <SearchIcon className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setSearchFocused(true)
              setSearchMode('suggestions')
            }}
            placeholder="Search your documents... (Press Enter for full results)"
            className="search-input"
          />
          {loading && <div className="search-loading">Searching...</div>}
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => {
                setSearchQuery('')
                setResults([])
                setSearchFocused(false)
                setSearchMode('suggestions')
              }}
              className="clear-search"
              title="Clear search"
              aria-label="Clear search"
            >
              <CloseIcon fontSize="small" />
            </button>
          )}
        </form>
      </div>

      {/* Search Overlay */}
      {searchFocused && searchQuery && (
        <div className="search-overlay" onClick={() => setSearchFocused(false)} />
      )}

      {/* Search Suggestions Dropdown (Live as you type) */}
      {searchMode === 'suggestions' && searchFocused && searchQuery && results.length > 0 && (
        <div className="search-results-dropdown">
          <div className="dropdown-header">
            <span>Quick Results</span>
            <span className="dropdown-hint">Press Enter for all results</span>
          </div>
          {results.slice(0, 5).map(result => (
            <div 
              key={result.id} 
              className="search-result-item"
              onClick={() => {
                handleDocumentClick(result.id)
                setSearchFocused(false)
              }}
            >
              <div className="result-icon">
                {getFileIcon(result.filename)}
              </div>
              <div className="result-info">
                <div className="result-path">{result.filename}</div>
                <div className="result-meta">
                  {result.category && <span>{result.category}</span>}
                  {result.team && <span> • {result.team}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Layout */}
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Documents</h2>
            <div className="sidebar-actions">
              <button onClick={loadData} className="refresh-button" title="Refresh">
                <RefreshIcon fontSize="small" />
              </button>
              <button onClick={handleClearAllDocuments} className="delete-all-button" title="Clear All Documents">
                <DeleteIcon fontSize="small" />
              </button>
              <button onClick={handleIndex} disabled={indexing} className="index-button-small" title="Index Documents Folder">
                {indexing ? <RefreshIcon className="spinning" fontSize="small" /> : <CloudUploadIcon fontSize="small" />}
              </button>
            </div>
          </div>

          {initialLoading ? (
            <div className="sidebar-loading">
              <RefreshIcon className="spinning" sx={{ fontSize: 40, color: '#666', mb: 2 }} />
              <p>Loading documents...</p>
            </div>
          ) : stats && (
            <>
              {/* Documents Section */}
              <div className="stat-section">
                <div 
                  className="stat-item clickable" 
                  onClick={() => toggleSection('documents')}
                >
                  <span><FolderIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> {stats.totalDocuments} documents</span>
                  {expandedSection === 'documents' ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                </div>
                {expandedSection === 'documents' && (
                  <div className="stat-content">
                    {documents.length > 0 ? (
                      documents.map(doc => (
                        <div 
                          key={doc.id} 
                          className={`stat-content-item clickable-doc ${loadingDocId === doc.id ? 'loading' : ''}`}
                          title={getFileName(doc.filename)}
                          onClick={() => handleDocumentClick(doc.id)}
                        >
                          {loadingDocId === doc.id ? (
                            <RefreshIcon className="spinning" fontSize="small" sx={{ mr: 0.5 }} />
                          ) : (
                            getFileIcon(doc.filename)
                          )}
                          {' '}{getFileName(doc.filename)}
                        </div>
                      ))
                    ) : (
                      <div className="stat-content-item">No documents yet</div>
                    )}
                  </div>
                )}
              </div>

              {/* Categories Section */}
              <div className="stat-section">
                <div 
                  className="stat-item clickable" 
                  onClick={() => toggleSection('categories')}
                >
                  <span><CategoryIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> {stats.categories.length} categories</span>
                  {expandedSection === 'categories' ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                </div>
                {expandedSection === 'categories' && (
                  <div className="stat-content">
                    {stats.categories.map(cat => (
                      <div key={cat}>
                        <div 
                          className="stat-content-item clickable-doc"
                          onClick={() => toggleCategory(cat)}
                        >
                          <CategoryIcon fontSize="small" sx={{ mr: 0.5 }} /> {cat}
                          {expandedCategory === cat ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                        </div>
                        {expandedCategory === cat && (
                          <div className="nested-content">
                            {documents
                              .filter(doc => doc.category === cat)
                              .map(doc => (
                                <div 
                                  key={doc.id}
                                  className={`nested-item ${loadingDocId === doc.id ? 'loading' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDocumentClick(doc.id)
                                  }}
                                >
                                  {loadingDocId === doc.id ? (
                                    <RefreshIcon className="spinning" fontSize="small" sx={{ mr: 0.5 }} />
                                  ) : (
                                    getFileIcon(doc.filename)
                                  )}
                                  {' '}{getFileName(doc.filename)}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Teams Section */}
              <div className="stat-section">
                <div 
                  className="stat-item clickable" 
                  onClick={() => toggleSection('teams')}
                >
                  <span><GroupIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> {stats.teams.length} teams</span>
                  {expandedSection === 'teams' ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                </div>
                {expandedSection === 'teams' && (
                  <div className="stat-content">
                    {stats.teams.map(team => (
                      <div key={team}>
                        <div 
                          className="stat-content-item clickable-doc"
                          onClick={() => toggleTeam(team)}
                        >
                          <GroupIcon fontSize="small" sx={{ mr: 0.5 }} /> {team}
                          {expandedTeam === team ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                        </div>
                        {expandedTeam === team && (
                          <div className="nested-content">
                            {documents
                              .filter(doc => doc.team === team)
                              .map(doc => (
                                <div 
                                  key={doc.id}
                                  className={`nested-item ${loadingDocId === doc.id ? 'loading' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDocumentClick(doc.id)
                                  }}
                                >
                                  {loadingDocId === doc.id ? (
                                    <RefreshIcon className="spinning" fontSize="small" sx={{ mr: 0.5 }} />
                                  ) : (
                                    getFileIcon(doc.filename)
                                  )}
                                  {' '}{getFileName(doc.filename)}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {searchMode === 'full' && searchQuery && results.length > 0 ? (
            <div className="full-search-results">
              <div className="search-results-header">
                <h2>Search Results for "{searchQuery}"</h2>
                <span className="results-count">{results.length} documents found</span>
              </div>
              <div className="search-results-grid">
                {results.map(result => (
                  <div 
                    key={result.id} 
                    className="search-result-card"
                    onClick={() => {
                      handleDocumentClick(result.id)
                      setSearchMode('suggestions')
                    }}
                  >
                    <div className="card-header">
                      <div className="result-icon-large">
                        {getFileIcon(result.filename)}
                      </div>
                      <div className="card-title">
                        <h3>{getFileName(result.filename)}</h3>
                        <p className="card-path">{result.filename}</p>
                      </div>
                    </div>
                    <p className="card-preview" dangerouslySetInnerHTML={{ __html: highlightKeywords(result.preview) }} />
                    <div className="card-footer">
                      {result.category && <span className="tag category">{result.category}</span>}
                      {result.team && <span className="tag team">{result.team}</span>}
                      {result.project && <span className="tag project">{result.project}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : loadingPreview ? (
            <div className="preview-loading-state">
              <RefreshIcon className="spinning" sx={{ fontSize: 60, color: '#8b5cf6', mb: 2 }} />
              <h3>Loading document...</h3>
              <p>Fetching content from cloud storage</p>
            </div>
          ) : selectedDocument ? (
            <div className="document-preview">
              <div className="preview-header">
                <div>
                  <h2>{selectedDocument.filename}</h2>
                  <div className="preview-meta">
                    {selectedDocument.category && <span className="tag category">{selectedDocument.category}</span>}
                    {selectedDocument.team && <span className="tag team">{selectedDocument.team}</span>}
                    {selectedDocument.project && <span className="tag project">{selectedDocument.project}</span>}
                  </div>
                </div>
                <div className="preview-actions">
                  <button 
                    type="button"
                    onClick={() => {
                      const doc = documents.find(d => d.id === selectedDocument.id)
                      if (doc) {
                        setInfoDocument(doc)
                        setShowInfoModal(true)
                      }
                    }} 
                    className="info-button"
                    title="File Details"
                  >
                    <InfoIcon />
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleDeleteDocument(selectedDocument.id)} 
                    className="delete-button"
                    title="Delete Document"
                  >
                    <DeleteIcon />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setSelectedDocument(null)
                      // If there's a search query with results, show full results
                      if (searchQuery && results.length > 0) {
                        setSearchMode('full')
                      }
                    }} 
                    className="close-preview" 
                    title="Close preview" 
                    aria-label="Close preview"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
              <div className="preview-content">
                {selectedDocument.filename.toLowerCase().endsWith('.pdf') ? (
                  <div className="pdf-preview-container">
                    <div className="pdf-fallback">
                      <PictureAsPdfIcon sx={{ fontSize: 80, color: '#ef4444', mb: 2 }} />
                      <h3>PDF Document</h3>
                      <p className="pdf-message">
                        This PDF is stored securely in the cloud. Click the button below to view it.
                      </p>
                      <a 
                        href={selectedDocument.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="pdf-download-button"
                      >
                        <PictureAsPdfIcon sx={{ mr: 1 }} />
                        Open PDF in New Tab
                      </a>
                      <div className="pdf-info">
                        <p><strong>Extracted Content Preview:</strong></p>
                        <p className="pdf-text-content">{selectedDocument.content}</p>
                      </div>
                    </div>
                  </div>
                ) : selectedDocument.filename.toLowerCase().endsWith('.md') ? (
                  <div 
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ __html: marked(selectedDocument.content) }}
                  />
                ) : selectedDocument.filename.toLowerCase().endsWith('.html') ? (
                  <div className="html-preview">
                    <div className="html-frame-container">
                      <iframe
                        srcDoc={selectedDocument.content}
                        title="HTML Preview"
                        className="html-frame"
                        sandbox="allow-same-origin"
                      />
                    </div>
                  </div>
                ) : selectedDocument.filename.toLowerCase().endsWith('.docx') || selectedDocument.filename.toLowerCase().endsWith('.doc') ? (
                  <div className="docx-preview">
                    <ArticleIcon sx={{ fontSize: 80, color: '#2563eb', mb: 2 }} />
                    <h3>Word Document</h3>
                    <p className="docx-message">
                      Word documents cannot be previewed directly in the browser.
                    </p>
                    <div className="pdf-info">
                      <p><strong>Extracted Content:</strong></p>
                      <p className="pdf-text-content">{selectedDocument.content}</p>
                    </div>
                    <a 
                      href={selectedDocument.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="pdf-download-button"
                      style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
                    >
                      <ArticleIcon sx={{ mr: 1 }} />
                      Download Word Document
                    </a>
                  </div>
                ) : (
                  <div className="text-preview">
                    <pre className="text-content">{selectedDocument.content}</pre>
                  </div>
                )}
              </div>
              <div className="preview-footer">
                <span>Size: {(selectedDocument.size / 1024).toFixed(2)} KB</span>
                <span>Modified: {new Date(selectedDocument.modified_at).toLocaleString()}</span>
              </div>
            </div>
          ) : (!searchQuery || (searchQuery && results.length === 0)) && searchMode !== 'full' && (
            <>
              <div
                className={`upload-area ${dragOver ? 'drag-over' : ''} ${indexing ? 'uploading' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !indexing && fileInputRef.current?.click()}
              >
                {indexing ? (
                  <>
                    <CloudUploadIcon className="upload-icon-animated" sx={{ fontSize: 80, mb: 2, color: '#8b5cf6' }} />
                    <h3>Uploading to Cloud...</h3>
                    {uploadingFileName && (
                      <p className="uploading-file">Processing: {uploadingFileName}</p>
                    )}
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
                        <span className="progress-text">{uploadProgress}%</span>
                      </div>
                    </div>
                    <p className="upload-hint">AI is analyzing and indexing your documents</p>
                  </>
                ) : (
                  <>
                    <CloudUploadIcon sx={{ fontSize: 80, mb: 2, color: '#6b7280' }} />
                    <h3>Drag & Drop Files Here</h3>
                    <p>or click to browse</p>
                    <p className="upload-hint">
                      Files will be uploaded to Cloudinary and indexed
                    </p>
                    <p className="upload-hint">
                      Supports: PDF, DOCX, TXT, MD, HTML, JSON
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt,.md,.html,.json"
                  onChange={handleFileSelect}
                  aria-label="Upload files"
                  disabled={indexing}
                />
              </div>

              {stats && stats.totalDocuments === 0 && (
                <div className="empty-state">
                  <h2>No documents indexed yet</h2>
                  <p>Drag & drop files above, or click the cloud icon in the sidebar to index the documents/ folder</p>
                  <button onClick={handleIndex} disabled={indexing} className="index-button">
                    {indexing ? <><RefreshIcon className="spinning" sx={{ mr: 1 }} /> Indexing...</> : <><CloudUploadIcon sx={{ mr: 1 }} /> Index Documents Folder</>}
                  </button>
                </div>
              )}
            </>
          )}



          {!selectedDocument && searchQuery && results.length === 0 && !loading && (
            <div className="no-results">
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}

          {!selectedDocument && loading && (
            <div className="search-loading-state">
              <RefreshIcon className="spinning" sx={{ fontSize: 60, color: '#8b5cf6', mb: 2 }} />
              <h3>Searching documents...</h3>
              <p>Using AI to find the most relevant results</p>
            </div>
          )}
        </main>
      </div>

      {/* Snackbar */}
      {snackbar && (
        <div className={`snackbar snackbar-${snackbar.type}`}>
          {snackbar.message}
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && infoDocument && (
        <div className="modal-overlay" onClick={() => setShowInfoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2><DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> File Details</h2>
              <button type="button" onClick={() => setShowInfoModal(false)} className="modal-close" title="Close" aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <div className="info-row">
                <span className="info-label">Filename:</span>
                <span className="info-value">{getFileName(infoDocument.filename)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">URL:</span>
                <div className="url-container">
                  <a 
                    href={infoDocument.path || infoDocument.filename} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cloudinary-link"
                    title={infoDocument.path?.startsWith('http') ? 'Open in Cloudinary' : 'Local file path'}
                  >
                    {infoDocument.path || infoDocument.filename}
                  </a>
                  <button
                    onClick={() => copyToClipboard(infoDocument.path || infoDocument.filename)}
                    className={`copy-url-button ${copiedUrl ? 'copied' : ''}`}
                    title="Copy URL"
                  >
                    {copiedUrl ? (
                      <>
                        <CheckIcon sx={{ fontSize: 14 }} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ContentCopyIcon sx={{ fontSize: 14 }} />
                        Copy URL
                      </>
                    )}
                  </button>
                </div>
              </div>
              {infoDocument.category && (
                <div className="info-row">
                  <span className="info-label">Category:</span>
                  <span className="info-value">{infoDocument.category}</span>
                </div>
              )}
              {infoDocument.team && (
                <div className="info-row">
                  <span className="info-label">Team:</span>
                  <span className="info-value">{infoDocument.team}</span>
                </div>
              )}
              {infoDocument.project && (
                <div className="info-row">
                  <span className="info-label">Project:</span>
                  <span className="info-value">{infoDocument.project}</span>
                </div>
              )}
              {infoDocument.size && (
                <div className="info-row">
                  <span className="info-label">Size:</span>
                  <span className="info-value">{(infoDocument.size / 1024).toFixed(2)} KB</span>
                </div>
              )}
              {infoDocument.modified_at && (
                <div className="info-row">
                  <span className="info-label">Modified:</span>
                  <span className="info-value">{new Date(infoDocument.modified_at).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default App
