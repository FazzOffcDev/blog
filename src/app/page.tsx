'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, BookOpen, MessageSquare, Users, PenTool } from 'lucide-react'
import Layout from '@/components/Layout'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: BookOpen,
      title: 'Blog Posts',
      description: 'Discover cutting-edge articles on AI, technology, and digital innovation',
      href: '/blog',
      color: 'from-[#8B5CF6] to-[#C084FC]'
    },
    {
      icon: MessageSquare,
      title: 'Forum Discussions',
      description: 'Engage with our community in thoughtful conversations',
      href: '/forum',
      color: 'from-[#C084FC] to-[#F472B6]'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with developers, thinkers, and innovators',
      href: '/topics',
      color: 'from-[#F472B6] to-[#8B5CF6]'
    },
    {
      icon: PenTool,
      title: 'Create Content',
      description: 'Share your knowledge and insights with the world',
      href: '/editor',
      color: 'from-[#8B5CF6] to-[#F472B6]'
    }
  ]

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          
          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <div className="mb-8">
              <Sparkles className="w-16 h-16 mx-auto text-[#8B5CF6] animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent animate-gradient">
                FazzCodex
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Where cosmic ideas meet digital innovation. Explore the frontier of technology through our blog and forum community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/blog"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#8B5CF6]/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Blog
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C084FC] to-[#F472B6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <Link 
                href="/forum"
                className="px-8 py-4 border border-[#8B5CF6] text-[#8B5CF6] rounded-full font-semibold hover:bg-[#8B5CF6] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#8B5CF6]/25"
              >
                Join Forum
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-[#C084FC] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#C084FC] rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
                Explore the Cosmos
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-[#8B5CF6]/50"
                  style={{
                    transform: `translateY(${scrollY * 0.1 * (index % 2 === 0 ? 1 : -1)}px)`
                  }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#C084FC] transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/10 to-[#F472B6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent">
                Join Our Growing Community
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-[#8B5CF6] mb-2">1K+</div>
                <div className="text-gray-400">Blog Posts</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-[#C084FC] mb-2">5K+</div>
                <div className="text-gray-400">Community Members</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-[#F472B6] mb-2">10K+</div>
                <div className="text-gray-400">Discussions</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}