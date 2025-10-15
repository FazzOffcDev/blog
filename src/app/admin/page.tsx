'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  FileText, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  Heart,
  Settings,
  LogOut,
  Shield,
  Database,
  Activity
} from 'lucide-react'
import Layout from '@/components/Layout'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  category: string
  published: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
  author: {
    name: string
    email: string
  }
  likes: number
  comments: number
  views: number
}

interface Stats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalUsers: number
  totalComments: number
  totalViews: number
  totalLikes: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalUsers: 0,
    totalComments: 0,
    totalViews: 0,
    totalLikes: 0
  })
  
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const mockStats: Stats = {
      totalPosts: 42,
      publishedPosts: 35,
      draftPosts: 7,
      totalUsers: 1234,
      totalComments: 567,
      totalViews: 45678,
      totalLikes: 2345
    }

    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'The Future of AI: Transforming Industries with Machine Learning',
        slug: 'future-of-ai',
        excerpt: 'Explore how artificial intelligence is revolutionizing sectors from healthcare to finance...',
        category: 'Artificial Intelligence',
        published: true,
        featured: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        author: {
          name: 'Sarah Chen',
          email: 'sarah@fazzcodex.com'
        },
        likes: 234,
        comments: 45,
        views: 1234
      },
      {
        id: '2',
        title: 'Building Scalable Web Applications with Next.js 15',
        slug: 'nextjs-15-scalability',
        excerpt: 'Learn how to leverage the latest features in Next.js 15 to build performant applications...',
        category: 'Web Development',
        published: true,
        featured: false,
        createdAt: '2024-01-12T14:30:00Z',
        updatedAt: '2024-01-12T14:30:00Z',
        author: {
          name: 'Alex Rodriguez',
          email: 'alex@fazzcodex.com'
        },
        likes: 189,
        comments: 32,
        views: 890
      },
      {
        id: '3',
        title: 'Quantum Computing: Breaking Down the Basics',
        slug: 'quantum-computing-basics',
        excerpt: 'A comprehensive introduction to quantum computing concepts for developers...',
        category: 'Quantum Computing',
        published: false,
        featured: false,
        createdAt: '2024-01-10T09:15:00Z',
        updatedAt: '2024-01-10T09:15:00Z',
        author: {
          name: 'Dr. James Wilson',
          email: 'james@fazzcodex.com'
        },
        likes: 156,
        comments: 28,
        views: 567
      }
    ]

    setTimeout(() => {
      setStats(mockStats)
      setPosts(mockPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'published' && post.published) ||
                         (filterStatus === 'draft' && !post.published)
    
    return matchesSearch && matchesFilter
  })

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
            <p className="text-gray-400">Loading admin dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Admin Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                <Shield className="w-8 h-8 text-[#8B5CF6]" />
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Manage your blog content and monitor performance</p>
            </div>
            
            <div className="flex gap-3">
              <Link
                href="/admin/blog/new"
                className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-lg font-medium text-white hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Post
              </Link>
              <button className="px-4 py-2 bg-white/10 rounded-lg font-medium text-white hover:bg-white/20 transition-colors flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button className="px-4 py-2 bg-red-500/20 rounded-lg font-medium text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-[#8B5CF6]" />
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stats.totalPosts}</div>
              <div className="text-sm text-gray-400">Blog Posts</div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-green-400">{stats.publishedPosts} published</span>
                <span className="text-xs text-gray-500">{stats.draftPosts} drafts</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-[#C084FC]" />
                <span className="text-sm text-gray-400">Active</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stats.totalUsers}</div>
              <div className="text-sm text-gray-400">Users</div>
              <div className="text-xs text-green-400 mt-2">+12% this month</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="w-8 h-8 text-[#F472B6]" />
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stats.totalComments}</div>
              <div className="text-sm text-gray-400">Comments</div>
              <div className="text-xs text-green-400 mt-2">+8% this week</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Views</div>
              <div className="text-xs text-green-400 mt-2">+25% this month</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Link
              href="/admin/blog"
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-[#8B5CF6]/50 group"
            >
              <FileText className="w-6 h-6 text-[#8B5CF6] mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white mb-1">Manage Posts</h3>
              <p className="text-sm text-gray-400">Create, edit, and delete blog posts</p>
            </Link>

            <Link
              href="/admin/users"
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-[#C084FC]/50 group"
            >
              <Users className="w-6 h-6 text-[#C084FC] mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white mb-1">User Management</h3>
              <p className="text-sm text-gray-400">Manage user accounts and permissions</p>
            </Link>

            <Link
              href="/admin/comments"
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-[#F472B6]/50 group"
            >
              <MessageSquare className="w-6 h-6 text-[#F472B6] mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white mb-1">Comments</h3>
              <p className="text-sm text-gray-400">Moderate and manage comments</p>
            </Link>

            <Link
              href="/admin/analytics"
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-green-400/50 group"
            >
              <BarChart3 className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white mb-1">Analytics</h3>
              <p className="text-sm text-gray-400">View detailed statistics and insights</p>
            </Link>
          </div>

          {/* Recent Posts Table */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Blog Posts</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                >
                  <option value="all" className="bg-black">All Posts</option>
                  <option value="published" className="bg-black">Published</option>
                  <option value="draft" className="bg-black">Drafts</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Author</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Stats</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <h3 className="font-medium text-white mb-1">{post.title}</h3>
                          {post.excerpt && (
                            <p className="text-sm text-gray-400 line-clamp-1">{post.excerpt}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm text-white">{post.author.name}</p>
                          <p className="text-xs text-gray-400">{post.author.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-[#C084FC]">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            post.published 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                          {post.featured && (
                            <span className="px-2 py-1 bg-[#F472B6]/20 text-[#F472B6] rounded text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {post.comments}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-400">
                          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                          <p className="text-xs">{new Date(post.createdAt).toLocaleTimeString()}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="p-1 rounded hover:bg-white/10 transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                          </Link>
                          <Link
                            href={`/admin/blog/edit/${post.id}`}
                            className="p-1 rounded hover:bg-white/10 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                          </Link>
                          <button
                            onClick={() => handleTogglePublish(post.id)}
                            className="p-1 rounded hover:bg-white/10 transition-colors"
                            title={post.published ? 'Unpublish' : 'Publish'}
                          >
                            <Activity className="w-4 h-4 text-gray-400 hover:text-white" />
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(post.id)}
                            className="p-1 rounded hover:bg-white/10 transition-colors"
                            title={post.featured ? 'Remove from featured' : 'Add to featured'}
                          >
                            <TrendingUp className="w-4 h-4 text-gray-400 hover:text-white" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1 rounded hover:bg-red-500/20 transition-colors"
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
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No posts found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}