'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Mail, Calendar, MapPin, Link as LinkIcon, Twitter, Github, Linkedin, BookOpen, MessageSquare, Heart, Settings, Edit3, Award, TrendingUp, Clock, MessageCircle } from 'lucide-react'
import Layout from '@/components/Layout'

const userProfile = {
  id: 1,
  name: 'Sarah Chen',
  username: 'sarahchen',
  email: 'sarah.chen@fazzcodex.com',
  role: 'AI Researcher & Content Creator',
  bio: 'Passionate about artificial intelligence, machine learning, and the future of technology. I love sharing knowledge and learning from the amazing community here at FazzCodex.',
  location: 'San Francisco, CA',
  website: 'https://sarahchen.dev',
  joinDate: 'January 2023',
  avatar: '/avatars/sarah.jpg',
  coverImage: '/covers/sarah-cover.jpg',
  social: {
    twitter: '@sarahchen_ai',
    github: 'sarahchen',
    linkedin: 'sarahchen'
  },
  stats: {
    posts: 42,
    discussions: 156,
    likes: 2340,
    followers: 892,
    following: 234
  },
  achievements: [
    { id: 1, name: 'Top Contributor', description: 'Ranked in top 10 contributors this month', icon: Award, color: 'from-[#F472B6] to-[#8B5CF6]' },
    { id: 2, name: 'AI Expert', description: 'Published 10+ AI-related articles', icon: TrendingUp, color: 'from-[#8B5CF6] to-[#C084FC]' },
    { id: 3, name: 'Community Leader', description: 'Active member for over 1 year', icon: Heart, color: 'from-[#C084FC] to-[#F472B6]' }
  ],
  recentPosts: [
    {
      id: 1,
      title: 'The Future of AI: Transforming Industries with Machine Learning',
      excerpt: 'Explore how artificial intelligence is revolutionizing sectors from healthcare to finance...',
      publishedAt: '2024-01-15',
      readTime: '8 min',
      likes: 234,
      comments: 45,
      category: 'Artificial Intelligence'
    },
    {
      id: 2,
      title: 'Building Neural Networks from Scratch: A Comprehensive Guide',
      excerpt: 'Learn the fundamentals of neural networks by building them from the ground up...',
      publishedAt: '2024-01-10',
      readTime: '12 min',
      likes: 189,
      comments: 32,
      category: 'Machine Learning'
    },
    {
      id: 3,
      title: 'Ethical AI: Balancing Innovation with Responsibility',
      excerpt: 'As AI becomes more powerful, we must consider the ethical implications...',
      publishedAt: '2024-01-05',
      readTime: '10 min',
      likes: 156,
      comments: 28,
      category: 'AI Ethics'
    }
  ],
  recentDiscussions: [
    {
      id: 1,
      title: 'Best practices for implementing AI in web applications?',
      replies: 45,
      views: 890,
      lastActivity: '5 minutes ago',
      category: 'Technical Support'
    },
    {
      id: 2,
      title: 'What are your thoughts on GPT-4 and its capabilities?',
      replies: 67,
      views: 1234,
      lastActivity: '2 hours ago',
      category: 'General'
    },
    {
      id: 3,
      title: 'How to get started with machine learning in 2024?',
      replies: 89,
      views: 2340,
      lastActivity: '1 day ago',
      category: 'Technical Support'
    }
  ]
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts')

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="relative mb-8">
            {/* Cover Image */}
            <div className="h-48 md:h-64 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#F472B6]/20 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-10 h-10 text-[#C084FC]" />
                </div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] p-1">
                  <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-1">{userProfile.name}</h1>
                      <p className="text-lg text-[#C084FC] mb-2">@{userProfile.username}</p>
                      <p className="text-gray-300 mb-4">{userProfile.role}</p>
                      <p className="text-gray-400 max-w-2xl">{userProfile.bio}</p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-xl font-medium text-white hover:scale-105 transition-transform flex items-center gap-2">
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button className="px-4 py-2 bg-white/10 rounded-xl font-medium text-white hover:bg-white/20 transition-colors flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                  </div>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {userProfile.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {userProfile.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {userProfile.joinDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#C084FC] hover:underline">
                        {userProfile.website.replace('https://', '')}
                      </a>
                    </span>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex gap-3 mt-4">
                    <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl font-bold text-[#8B5CF6]">{userProfile.stats.posts}</div>
              <div className="text-sm text-gray-400">Posts</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl font-bold text-[#C084FC]">{userProfile.stats.discussions}</div>
              <div className="text-sm text-gray-400">Discussions</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl font-bold text-[#F472B6]">{userProfile.stats.likes}</div>
              <div className="text-sm text-gray-400">Likes</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl font-bold text-[#8B5CF6]">{userProfile.stats.followers}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl font-bold text-[#C084FC]">{userProfile.stats.following}</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userProfile.achievements.map((achievement) => (
                <div key={achievement.id} className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center mb-3`}>
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{achievement.name}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Tabs */}
          <div className="border-b border-white/10 mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`pb-4 px-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'posts'
                    ? 'text-[#8B5CF6] border-[#8B5CF6]'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Recent Posts
              </button>
              <button
                onClick={() => setActiveTab('discussions')}
                className={`pb-4 px-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'discussions'
                    ? 'text-[#8B5CF6] border-[#8B5CF6]'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Recent Discussions
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {userProfile.recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="block p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-[#8B5CF6]/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-[#C084FC]">
                          {post.category}
                        </span>
                        <span className="text-gray-400 text-sm">• {post.readTime}</span>
                        <span className="text-gray-400 text-sm">• {post.publishedAt}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 text-white hover:text-[#C084FC] transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'discussions' && (
            <div className="space-y-4">
              {userProfile.recentDiscussions.map((discussion) => (
                <Link
                  key={discussion.id}
                  href={`/forum/${discussion.id}`}
                  className="block p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-[#8B5CF6]/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-[#C084FC]">
                          {discussion.category}
                        </span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {discussion.lastActivity}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 text-white hover:text-[#C084FC] transition-colors">
                        {discussion.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {discussion.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {discussion.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}