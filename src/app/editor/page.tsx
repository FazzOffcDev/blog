'use client'

import { useState, useRef, useEffect } from 'react'
import { Save, Eye, Bold, Italic, Link2, Image, Code, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Highlight, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, X, Send, Sparkles } from 'lucide-react'
import Layout from '@/components/Layout'

const categories = [
  'Artificial Intelligence',
  'Web Development',
  'Quantum Computing',
  'Cybersecurity',
  'Data Science',
  'Cloud Computing',
  'General'
]

const toolbarButtons = [
  { icon: Bold, action: 'bold', title: 'Bold' },
  { icon: Italic, action: 'italic', title: 'Italic' },
  { icon: Underline, action: 'underline', title: 'Underline' },
  { icon: Strikethrough, action: 'strikethrough', title: 'Strikethrough' },
  { divider: true },
  { icon: Heading1, action: 'h1', title: 'Heading 1' },
  { icon: Heading2, action: 'h2', title: 'Heading 2' },
  { icon: Heading3, action: 'h3', title: 'Heading 3' },
  { divider: true },
  { icon: List, action: 'ul', title: 'Bullet List' },
  { icon: ListOrdered, action: 'ol', title: 'Numbered List' },
  { icon: Quote, action: 'quote', title: 'Quote' },
  { icon: Code, action: 'code', title: 'Code' },
  { divider: true },
  { icon: Link2, action: 'link', title: 'Link' },
  { icon: Image, action: 'image', title: 'Image' },
  { icon: Highlight, action: 'highlight', title: 'Highlight' },
  { divider: true },
  { icon: AlignLeft, action: 'alignLeft', title: 'Align Left' },
  { icon: AlignCenter, action: 'alignCenter', title: 'Align Center' },
  { icon: AlignRight, action: 'alignRight', title: 'Align Right' }
]

export default function EditorPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('General')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showSaveNotification, setShowSaveNotification] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [title, content, excerpt, category, tags])

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setShowSaveNotification(true)
    setTimeout(() => setShowSaveNotification(false), 3000)
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in the title and content before publishing.')
      return
    }
    
    setIsPublishing(true)
    // Simulate publish operation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsPublishing(false)
    alert('Post published successfully!')
  }

  const handleToolbarAction = (action: string) => {
    if (!editorRef.current) return
    
    const textarea = editorRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    let newText = content
    let cursorPosition = end

    switch (action) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end)
        cursorPosition = start + selectedText.length + 4
        break
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end)
        cursorPosition = start + selectedText.length + 2
        break
      case 'code':
        newText = content.substring(0, start) + `\`${selectedText}\`` + content.substring(end)
        cursorPosition = start + selectedText.length + 2
        break
      case 'link':
        const url = prompt('Enter URL:')
        if (url) {
          newText = content.substring(0, start) + `[${selectedText}](${url})` + content.substring(end)
          cursorPosition = start + selectedText.length + url.length + 4
        }
        break
      case 'h1':
        newText = content.substring(0, start) + `# ${selectedText}` + content.substring(end)
        cursorPosition = start + selectedText.length + 2
        break
      case 'h2':
        newText = content.substring(0, start) + `## ${selectedText}` + content.substring(end)
        cursorPosition = start + selectedText.length + 3
        break
      case 'h3':
        newText = content.substring(0, start) + `### ${selectedText}` + content.substring(end)
        cursorPosition = start + selectedText.length + 4
        break
      case 'quote':
        newText = content.substring(0, start) + `> ${selectedText}` + content.substring(end)
        cursorPosition = start + selectedText.length + 2
        break
      case 'ul':
        newText = content.substring(0, start) + `- ${selectedText}` + content.substring(end)
        cursorPosition = start + selectedText.length + 2
        break
      case 'ol':
        newText = content.substring(0, start) + `1. ${selectedText}` + content.substring(end)
        cursorPosition = start + selectedText.length + 4
        break
    }

    setContent(newText)
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus()
        editorRef.current.setSelectionRange(cursorPosition, cursorPosition)
      }
    }, 0)
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const renderPreview = () => {
    return (
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-4">{title || 'Untitled Post'}</h1>
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
          <span>Category: {category}</span>
          <span>•</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        {excerpt && (
          <div className="text-lg text-gray-300 mb-6 italic border-l-4 border-[#8B5CF6] pl-4">
            {excerpt}
          </div>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#8B5CF6]/20 text-[#C084FC] rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="text-white leading-relaxed whitespace-pre-wrap">
          {content || 'Start writing your content...'}
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
                Create Post
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPreview(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !isPreview ? 'bg-[#8B5CF6] text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsPreview(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isPreview ? 'bg-[#8B5CF6] text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  Preview
                </button>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-white/10 rounded-lg font-medium text-white hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-6 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-lg font-medium text-white hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>

          {/* Save Notification */}
          {showSaveNotification && (
            <div className="fixed top-24 right-4 px-4 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 flex items-center gap-2 z-50">
              <Save className="w-4 h-4" />
              Draft saved successfully!
            </div>
          )}

          {!isPreview ? (
            <div className="space-y-6">
              {/* Title Input */}
              <input
                type="text"
                placeholder="Enter your post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-6 py-4 text-3xl font-bold bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />

              {/* Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-black">{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#8B5CF6]/20 text-[#C084FC] rounded-full text-sm flex items-center gap-1"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add tags (press Enter)..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt (Optional)</label>
                <textarea
                  placeholder="Brief description of your post..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
                />
              </div>

              {/* Toolbar */}
              <div className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="flex flex-wrap items-center gap-2">
                  {toolbarButtons.map((button, index) => (
                    button.divider ? (
                      <div key={index} className="w-px h-6 bg-white/20 mx-1" />
                    ) : (
                      <button
                        key={button.action}
                        onClick={() => handleToolbarAction(button.action)}
                        title={button.title}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                      >
                        <button.icon className="w-4 h-4" />
                      </button>
                    )
                  ))}
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  ref={editorRef}
                  placeholder="Start writing your post content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none font-mono text-sm leading-relaxed"
                />
              </div>

              {/* Word Count */}
              <div className="text-sm text-gray-400 text-right">
                {content.split(/\s+/).filter(word => word.length > 0).length} words • {content.length} characters
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              {renderPreview()}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}