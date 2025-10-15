'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, TrendingUp, Clock, Star, ArrowRight, Cpu, Brain, Globe, Zap, Shield, Database } from 'lucide-react'
import Layout from '@/components/Layout'

const topics = [
  {
    id: 1,
    name: 'Artificial Intelligence',
    description: 'Latest developments in machine learning, neural networks, and AI applications',
    icon: Brain,
    color: 'from-[#8B5CF6] to-[#C084FC]',
    postCount: 234,
    trending: true,
    tags: ['ML', 'Deep Learning', 'NLP', 'Computer Vision']
  },
  {
    id: 2,
    name: 'Web Development',
    description: 'Modern web technologies, frameworks, and best practices',
    icon: Globe,
    color: 'from-[#C084FC] to-[#F472B6]',
    postCount: 189,
    trending: true,
    tags: ['React', 'Next.js', 'TypeScript', 'CSS']
  },
  {
    id: 3,
    name: 'Cloud Computing',
    description: 'Cloud architecture, services, and deployment strategies',
    icon: Zap,
    color: 'from-[#F472B6] to-[#8B5CF6]',
    postCount: 156,
    trending: false,
    tags: ['AWS', 'Azure', 'Docker', 'Kubernetes']
  },
  {
    id: 4,
    name: 'Cybersecurity',
    description: 'Security best practices, threats, and protection strategies',
    icon: Shield,
    color: 'from-[#8B5CF6] to-[#F472B6]',
    postCount: 142,
    trending: false,
    tags: ['Encryption', 'Network Security', 'Ethical Hacking']
  },
  {
    id: 5,
    name: 'Data Science',
    description: 'Data analysis, visualization, and statistical modeling',
    icon: Database,
    color: 'from-[#C084FC] to-[#8B5CF6]',
    postCount: 198,
    trending: true,
    tags: ['Python', 'Statistics', 'Visualization', 'Big Data']
  },
  {
    id: 6,
    name: 'Quantum Computing',
    description: 'Quantum algorithms, hardware, and future applications',
    icon: Cpu,
    color: 'from-[#F472B6] to-[#C084FC]',
    postCount: 87,
    trending: false,
    tags: ['Qubits', 'Quantum Algorithms', 'IBM Q', 'Google Quantum']
  }
]

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'trending' && topic.trending) ||
                         (selectedFilter === 'recent' && !topic.trending)
    
    return matchesSearch && matchesFilter
  })

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
                Explore Topics
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover content across various technology domains and join discussions that matter to you
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                All Topics
              </button>
              <button
                onClick={() => setSelectedFilter('trending')}
                className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  selectedFilter === 'trending'
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Trending
              </button>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-[#8B5CF6]/50 overflow-hidden"
              >
                {topic.trending && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-[#F472B6] to-[#8B5CF6] rounded-full text-xs font-semibold text-white">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    Trending
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <topic.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#C084FC] transition-colors">
                  {topic.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {topic.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {topic.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {topic.tags.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300">
                      +{topic.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {topic.postCount} posts
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/10 to-[#F472B6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg">No topics found matching your search.</p>
              <p className="text-gray-500 text-sm mt-2">Try different keywords or browse all topics.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}