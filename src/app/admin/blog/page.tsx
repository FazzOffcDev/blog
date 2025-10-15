'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  MoreHorizontal
} from 'lucide-react'
import Layout from '@/components/Layout'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  category: string
  tags: string
  coverImage?: string
  published: boolean
  featured: boolean
  readTime?: number
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  stats: {
    views: number
    likes: number
    comments: number
    shares: number
  }
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const postsPerPage = 10

  const categories = [
    'all',
    'Artificial Intelligence',
    'Web Development',
    'Quantum Computing',
    'Cybersecurity',
    'Data Science',
    'Cloud Computing'
  ]

  useEffect(() => {
    // Simulate fetching blog posts
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'The Future of AI: Transforming Industries with Machine Learning',
        slug: 'future-of-ai-transforming-industries',
        excerpt: 'Explore how artificial intelligence is revolutionizing sectors from healthcare to finance, and what the next decade holds for AI development.',
        content: 'Full content here...',
        category: 'Artificial Intelligence',
        tags: '["machine learning", "neural networks", "industry 4.0"]',
        coverImage: '/images/ai-future.jpg',
        published: true,
        featured: true,
        readTime: 8,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        author: {
          id: '1',
          name: 'Sarah Chen',
          email: 'sarah@fazzcodex.com',
          avatar: '/avatars/sarah.jpg'
        },
        stats: {
          views: 1234,
          likes: 234,
          comments: 45,
          shares: 12
        }
      },
      {
        id: '2',
        title: 'Building Scalable Web Applications with Next.js 15',
        slug: 'building-scalable-web-applications-nextjs-15',
        excerpt: 'Learn how to leverage the latest features in Next.js 15 to build performant, SEO-friendly web applications that scale.',
        content: 'Full content here...',
        category: 'Web Development',
        tags: '["nextjs", "react", "typescript", "performance"]',
        coverImage: '/images/nextjs-15.jpg',
        published: true,
        featured: false,
        readTime: 12,
        createdAt: '2024-01-12T14:30:00Z',
        updatedAt: '2024-01-12T14:30:00Z',
        author: {
          id: '2',
          name: 'Alex Rodriguez',
          email: 'alex@fazzcodex.com',
          avatar: '/avatars/alex.jpg'
        },
        stats: {
          views: 890,
          likes: 189,
          comments: 32,
          shares: 8
        }
      },
      {
        id: '3',
        title: 'Quantum Computing: Breaking Down the Basics',
        slug: 'quantum-computing-breaking-down-basics',
        excerpt: 'A comprehensive introduction to quantum computing concepts, from qubits to quantum algorithms, for developers and researchers.',
        content: 'Full content here...',
        category: 'Quantum Computing',
        tags: '["quantum", "algorithms", "ibm q", "future tech"]',
        coverImage: '/images/quantum-basics.jpg',
        published: false,
        featured: false,
        readTime: 15,
        createdAt: '2024-01-10T09:15:00Z',
        updatedAt: '2024-01-10T09:15:00Z',
        author: {
          id: '3',
          name: 'Dr. James Wilson',
          email: 'james@fazzcodex.com',
          avatar: '/avatars/james.jpg'
        },
        stats: {
          views: 567,
          likes: 156,
          comments: 28,
          shares: 5
        }
      }
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'published' && post.published) ||
                         (filterStatus === 'draft' && !post.published) ||
                         (filterStatus === 'featured' && post.featured)
    
    return matchesSearch && matchesCategory && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'views':
        return b.stats.views - a.stats.views
      case 'likes':
        return b.stats.likes - a.stats.likes
      case 'comments':
        return b.stats.comments - a.stats.comments
      case 'updatedAt':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const handleSelectAll = () => {
    if (selectedPosts.length === paginatedPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(paginatedPosts.map(post => post.id))
    }
  }

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedPosts.length} posts?`)) {
      setPosts(posts.filter(post => !selectedPosts.includes(post.id)))
      setSelectedPosts([])
    }
  }

  const handleBulkPublish = (publish: boolean) => {
    setPosts(posts.map(post => 
      selectedPosts.includes(post.id) ? { ...post, published: publish } : post
    ))
    setSelectedPosts([])
  }

  const handleDeletePost = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  const handleTogglePublish = async (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, published: !post.published } : post
    ))
  }

  const handleToggleFeatured = async (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, featured: !post.featured } : post
    ))
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading blog posts...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                <FileText className="w-8 h-8 text-[#8B5CF6]" />
                Blog Management
              </h1>
              <p className="text-gray-400">Manage your blog posts, create new content, and monitor performance</p>
            </div>
            
            <div className="flex gap-3">
              <Link
                href="/admin/blog/new"
                className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-lg font-medium text-white hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Post
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-6 h-6 text-[#8B5CF6]" />
                <span className="text-2xl font-bold text-white">{posts.length}</span>
              </div>
              <p className="text-sm text-gray-400">Total Posts</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <span className="text-2xl font-bold text-white">{posts.filter(p => p.published).length}</span>
              </div>
              <p className="text-sm text-gray-400">Published</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-6 h-6 text-yellow-400" />
                <span className="text-2xl font-bold text-white">{posts.filter(p => !p.published).length}</span>
              </div>
              <p className="text-sm text-gray-400">Drafts</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <Heart className="w-6 h-6 text-[#F472B6]" />
                <span className="text-2xl font-bold text-white">{posts.reduce((acc, p) => acc + p.stats.likes, 0)}</span>
              </div>
              <p className="text-sm text-gray-400">Total Likes</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts by title, content, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-black">
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                >
                  <option value="all" className="bg-black">All Status</option>
                  <option value="published" className="bg-black">Published</option>
                  <option value="draft" className="bg-black">Drafts</option>
                  <option value="featured" className="bg-black">Featured</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                >
                  <option value="createdAt" className="bg-black">Latest First</option>
                  <option value="updatedAt" className="bg-black">Last Updated</option>
                  <option value="title" className="bg-black">Title A-Z</option>
                  <option value="views" className="bg-black">Most Views</option>
                  <option value="likes" className="bg-black">Most Likes</option>
                  <option value="comments" className="bg-black">Most Comments</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedPosts.length > 0 && (
              <div className="flex items-center justify-between mt-4 p-3 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-lg">
                <span className="text-sm text-[#C084FC]">
                  {selectedPosts.length} post{selectedPosts.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkPublish(true)}
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30 transition-colors"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => handleBulkPublish(false)}
                    className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm hover:bg-yellow-500/30 transition-colors"
                  >
                    Unpublish
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Posts Table */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedPosts.length === paginatedPosts.length && paginatedPosts.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-white/20 bg-white/10 text-[#8B5CF6] focus:ring-[#8B5CF6]"
                      />
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Post</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Author</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Category</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Stats</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Date</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPosts.map((post) => (
                    <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedPosts.includes(post.id)}
                          onChange={() => handleSelectPost(post.id)}
                          className="rounded border-white/20 bg-white/10 text-[#8B5CF6] focus:ring-[#8B5CF6]"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8B5CF6]/20 to-[#F472B6]/20 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-[#C084FC]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-white mb-1 line-clamp-1">{post.title}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">{post.readTime} min read</span>
                              {post.featured && (
                                <span className="px-2 py-0.5 bg-[#F472B6]/20 text-[#F472B6] rounded text-xs">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C084FC] to-[#F472B6] flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {post.author.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-white">{post.author.name}</p>
                            <p className="text-xs text-gray-400">{post.author.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-[#C084FC]">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          post.published 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.stats.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.stats.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {post.stats.comments}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-400">
                          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                          <p className="text-xs">{new Date(post.createdAt).toLocaleTimeString()}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="p-1.5 rounded hover:bg-white/10 transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                          </Link>
                          <Link
                            href={`/admin/blog/edit/${post.id}`}
                            className="p-1.5 rounded hover:bg-white/10 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                          </Link>
                          <button
                            onClick={() => handleTogglePublish(post.id)}
                            className="p-1.5 rounded hover:bg-white/10 transition-colors"
                            title={post.published ? 'Unpublish' : 'Publish'}
                          >
                            <Upload className="w-4 h-4 text-gray-400 hover:text-white" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No posts found matching your criteria.</p>
                <Link
                  href="/admin/blog/new"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-lg font-medium text-white hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                  Create your first post
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}