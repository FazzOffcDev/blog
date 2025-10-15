'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Calendar, Clock, User, Heart, MessageCircle, Share2, Filter, TrendingUp, ArrowRight } from 'lucide-react'
import Layout from '@/components/Layout'

const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI: Transforming Industries with Machine Learning',
    excerpt: 'Explore how artificial intelligence is revolutionizing sectors from healthcare to finance, and what the next decade holds for AI development.',
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      role: 'AI Researcher'
    },
    publishedAt: '2024-01-15',
    readTime: '8 min',
    category: 'Artificial Intelligence',
    tags: ['Machine Learning', 'Neural Networks', 'Industry 4.0'],
    featured: true,
    likes: 234,
    comments: 45,
    image: '/blog/ai-future.jpg'
  },
  {
    id: 2,
    title: 'Building Scalable Web Applications with Next.js 15',
    excerpt: 'Learn how to leverage the latest features in Next.js 15 to build performant, SEO-friendly web applications that scale.',
    author: {
      name: 'Alex Rodriguez',
      avatar: '/avatars/alex.jpg',
      role: 'Full Stack Developer'
    },
    publishedAt: '2024-01-12',
    readTime: '12 min',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript', 'Performance'],
    featured: true,
    likes: 189,
    comments: 32,
    image: '/blog/nextjs-15.jpg'
  },
  {
    id: 3,
    title: 'Quantum Computing: Breaking Down the Basics',
    excerpt: 'A comprehensive introduction to quantum computing concepts, from qubits to quantum algorithms, for developers and researchers.',
    author: {
      name: 'Dr. James Wilson',
      avatar: '/avatars/james.jpg',
      role: 'Quantum Physicist'
    },
    publishedAt: '2024-01-10',
    readTime: '15 min',
    category: 'Quantum Computing',
    tags: ['Quantum', 'Algorithms', 'IBM Q', 'Future Tech'],
    featured: false,
    likes: 156,
    comments: 28,
    image: '/blog/quantum-basics.jpg'
  },
  {
    id: 4,
    title: 'Cybersecurity Best Practices for Modern Applications',
    excerpt: 'Essential security measures every developer should implement to protect applications from common vulnerabilities and attacks.',
    author: {
      name: 'Maria Garcia',
      avatar: '/avatars/maria.jpg',
      role: 'Security Expert'
    },
    publishedAt: '2024-01-08',
    readTime: '10 min',
    category: 'Cybersecurity',
    tags: ['Security', 'Best Practices', 'Encryption', 'Network'],
    featured: false,
    likes: 203,
    comments: 41,
    image: '/blog/cybersecurity.jpg'
  },
  {
    id: 5,
    title: 'Data Visualization Techniques for Complex Datasets',
    excerpt: 'Master the art of turning complex data into compelling visual stories using modern visualization tools and techniques.',
    author: {
      name: 'David Kim',
      avatar: '/avatars/david.jpg',
      role: 'Data Scientist'
    },
    publishedAt: '2024-01-05',
    readTime: '9 min',
    category: 'Data Science',
    tags: ['Visualization', 'D3.js', 'Analytics', 'Storytelling'],
    featured: false,
    likes: 167,
    comments: 23,
    image: '/blog/data-viz.jpg'
  },
  {
    id: 6,
    title: 'Cloud-Native Architecture: Design Patterns and Best Practices',
    excerpt: 'Learn how to design and implement cloud-native applications using microservices, containers, and modern DevOps practices.',
    author: {
      name: 'Emma Thompson',
      avatar: '/avatars/emma.jpg',
      role: 'Cloud Architect'
    },
    publishedAt: '2024-01-03',
    readTime: '11 min',
    category: 'Cloud Computing',
    tags: ['Cloud', 'Microservices', 'Kubernetes', 'DevOps'],
    featured: false,
    likes: 145,
    comments: 19,
    image: '/blog/cloud-native.jpg'
  }
]

const categories = ['All', 'Artificial Intelligence', 'Web Development', 'Quantum Computing', 'Cybersecurity', 'Data Science', 'Cloud Computing']

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('latest')

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    if (sortBy === 'popular') return b.likes - a.likes
    return 0
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
                FazzCodex Blog
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, tutorials, and perspectives from the cutting edge of technology
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#F472B6]" />
                Featured Posts
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-[#8B5CF6]/50"
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#8B5CF6]/20 to-[#F472B6]/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-[#C084FC]" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-full text-xs font-semibold text-white">
                          {post.category}
                        </span>
                        <span className="text-gray-400 text-sm">• {post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#C084FC] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C084FC] to-[#F472B6] flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{post.author.name}</p>
                            <p className="text-xs text-gray-400">{post.publishedAt}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-400">
                          <span className="flex items-center gap-1 text-sm">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1 text-sm">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-black">
                  {category}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
            >
              <option value="latest" className="bg-black">Latest</option>
              <option value="popular" className="bg-black">Most Popular</option>
            </select>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-[#8B5CF6]/50"
              >
                <div className="aspect-video bg-gradient-to-br from-[#8B5CF6]/10 to-[#F472B6]/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#C084FC]" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-white/10 rounded-lg text-xs font-medium text-[#C084FC]">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">• {post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#C084FC] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#C084FC] to-[#F472B6] flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300">{post.author.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg">No articles found matching your search.</p>
              <p className="text-gray-500 text-sm mt-2">Try different keywords or browse all categories.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}