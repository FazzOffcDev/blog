'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MessageSquare, Users, Clock, Flame, Pin, Plus, Filter, TrendingUp, ArrowRight, User } from 'lucide-react'
import Layout from '@/components/Layout'

const forumCategories = [
  { id: 'all', name: 'All Discussions', color: 'from-[#8B5CF6] to-[#C084FC]', icon: MessageSquare },
  { id: 'general', name: 'General', color: 'from-[#C084FC] to-[#F472B6]', icon: MessageSquare },
  { id: 'tech', name: 'Technical Support', color: 'from-[#F472B6] to-[#8B5CF6]', icon: Users },
  { id: 'ideas', name: 'Ideas & Suggestions', color: 'from-[#8B5CF6] to-[#F472B6]', icon: Flame },
  { id: 'announcements', name: 'Announcements', color: 'from-[#C084FC] to-[#8B5CF6]', icon: Pin }
]

const discussions = [
  {
    id: 1,
    title: 'Welcome to FazzCodex Forum! Introduce yourself here',
    content: 'Hey everyone! Excited to be part of this amazing community. I\'m a full-stack developer with 5 years of experience...',
    author: {
      name: 'Alex Chen',
      avatar: '/avatars/alex.jpg',
      role: 'Community Manager'
    },
    category: 'general',
    isPinned: true,
    isLocked: false,
    replies: 156,
    views: 2340,
    lastActivity: '2 hours ago',
    lastReplyBy: 'Sarah Johnson',
    tags: ['introduction', 'welcome'],
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    title: 'Best practices for implementing AI in web applications?',
    content: 'I\'m working on a project that involves integrating machine learning models into a React application. What are the best approaches...',
    author: {
      name: 'Maria Rodriguez',
      avatar: '/avatars/maria.jpg',
      role: 'AI Developer'
    },
    category: 'tech',
    isPinned: false,
    isLocked: false,
    replies: 45,
    views: 890,
    lastActivity: '5 minutes ago',
    lastReplyBy: 'David Kim',
    tags: ['ai', 'web-development', 'machine-learning'],
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    title: 'Feature Request: Dark mode for the blog editor',
    content: 'Would love to see a dark mode option for the blog editor. It would be easier on the eyes during late-night writing sessions...',
    author: {
      name: 'James Wilson',
      avatar: '/avatars/james.jpg',
      role: 'Content Creator'
    },
    category: 'ideas',
    isPinned: false,
    isLocked: false,
    replies: 23,
    views: 456,
    lastActivity: '1 hour ago',
    lastReplyBy: 'Emma Thompson',
    tags: ['feature-request', 'ui', 'dark-mode'],
    createdAt: '2024-01-13'
  },
  {
    id: 4,
    title: 'New Feature: Real-time collaboration is now live!',
    content: 'We\'re excited to announce that real-time collaboration is now available for all users. You can now co-author blog posts and forum threads...',
    author: {
      name: 'FazzCodex Team',
      avatar: '/avatars/team.jpg',
      role: 'Admin'
    },
    category: 'announcements',
    isPinned: true,
    isLocked: true,
    replies: 89,
    views: 3456,
    lastActivity: '30 minutes ago',
    lastReplyBy: 'Lisa Chen',
    tags: ['announcement', 'new-feature', 'collaboration'],
    createdAt: '2024-01-15'
  },
  {
    id: 5,
    title: 'How to optimize Next.js 15 for better performance?',
    content: 'I\'ve been experimenting with Next.js 15 and noticed some performance issues. Has anyone found good optimization strategies...',
    author: {
      name: 'Tom Anderson',
      avatar: '/avatars/tom.jpg',
      role: 'Frontend Developer'
    },
    category: 'tech',
    isPinned: false,
    isLocked: false,
    replies: 67,
    views: 1234,
    lastActivity: '15 minutes ago',
    lastReplyBy: 'Rachel Green',
    tags: ['nextjs', 'performance', 'optimization'],
    createdAt: '2024-01-12'
  },
  {
    id: 6,
    title: 'Community guidelines update - Please read',
    content: 'We\'ve updated our community guidelines to better reflect our values and ensure a positive environment for all members...',
    author: {
      name: 'FazzCodex Team',
      avatar: '/avatars/team.jpg',
      role: 'Admin'
    },
    category: 'announcements',
    isPinned: true,
    isLocked: true,
    replies: 34,
    views: 2890,
    lastActivity: '3 hours ago',
    lastReplyBy: 'Michael Brown',
    tags: ['guidelines', 'community', 'update'],
    createdAt: '2024-01-10'
  }
]

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('latest')

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory
    
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    
    if (sortBy === 'latest') {
      // Sort by last activity (more recent first)
      return 0 // Simplified for now
    }
    if (sortBy === 'popular') return b.replies - a.replies
    if (sortBy === 'views') return b.views - a.views
    return 0
  })

  const getCategoryColor = (categoryId: string) => {
    const category = forumCategories.find(cat => cat.id === categoryId)
    return category ? category.color : 'from-[#8B5CF6] to-[#C084FC]'
  }

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
                  Community Forum
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Join the conversation and share your knowledge
              </p>
            </div>
            
            <Link
              href="/forum/new"
              className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-xl font-semibold text-white hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Discussion
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {forumCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
            >
              <option value="latest" className="bg-black">Latest Activity</option>
              <option value="popular" className="bg-black">Most Replies</option>
              <option value="views" className="bg-black">Most Views</option>
            </select>
          </div>

          {/* Discussions List */}
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <Link
                key={discussion.id}
                href={`/forum/${discussion.id}`}
                className="group block p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-[#8B5CF6]/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {discussion.isPinned && (
                        <Pin className="w-4 h-4 text-[#F472B6]" />
                      )}
                      {discussion.isLocked && (
                        <Users className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`px-2 py-1 bg-gradient-to-r ${getCategoryColor(discussion.category)} rounded-full text-xs font-semibold text-white`}>
                        {forumCategories.find(cat => cat.id === discussion.category)?.name}
                      </span>
                      <div className="flex gap-1">
                        {discussion.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#C084FC] transition-colors">
                      {discussion.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {discussion.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C084FC] to-[#F472B6] flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{discussion.author.name}</p>
                            <p className="text-xs text-gray-400">{discussion.author.role}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {discussion.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {discussion.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {discussion.lastActivity}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C084FC] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          {filteredDiscussions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg">No discussions found matching your search.</p>
              <p className="text-gray-500 text-sm mt-2">Try different keywords or browse all categories.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}