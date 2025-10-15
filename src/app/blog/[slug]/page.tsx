'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  MessageCircle, 
  Share2, 
  Eye, 
  Bookmark,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  Tag,
  TrendingUp,
  Github
} from 'lucide-react'
import Layout from '@/components/Layout'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  category: string
  tags: string[]
  readTime: number
  published: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    email: string
    avatar?: string
    bio?: string
    role?: string
    social?: {
      twitter?: string
      github?: string
      linkedin?: string
    }
  }
  stats: {
    views: number
    likes: number
    comments: number
    shares: number
  }
  relatedPosts?: {
    id: string
    title: string
    slug: string
    excerpt: string
    coverImage?: string
    category: string
    readTime: number
    createdAt: string
    author: {
      name: string
    }
  }[]
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    // Simulate fetching blog post
    const mockPost: BlogPost = {
      id: '1',
      title: 'The Future of AI: Transforming Industries with Machine Learning',
      slug: params.slug as string,
      excerpt: 'Explore how artificial intelligence is revolutionizing sectors from healthcare to finance, and what the next decade holds for AI development.',
      content: `# The Future of AI: Transforming Industries with Machine Learning

Artificial Intelligence is no longer a concept of science fiction; it's a tangible reality that's reshaping our world in unprecedented ways. From healthcare to finance, from transportation to entertainment, AI is revolutionizing every sector it touches.

## The Healthcare Revolution

In healthcare, AI is making waves with diagnostic tools that can detect diseases earlier and more accurately than ever before. Machine learning algorithms are analyzing medical images, predicting patient outcomes, and even assisting in drug discovery processes that once took decades.

**Key Applications:**
- Medical image analysis and diagnosis
- Personalized treatment plans
- Drug discovery and development
- Predictive analytics for patient care

## Financial Services Transformation

The financial industry has embraced AI with open arms, using it for everything from fraud detection to algorithmic trading. Banks and fintech companies are leveraging machine learning to provide better customer experiences and more robust security measures.

## The Road Ahead

As we look toward the future, the possibilities seem endless. Quantum computing combined with AI could solve problems that are currently intractable. Edge AI will bring intelligence to devices without constant cloud connectivity. And as AI becomes more sophisticated, ethical considerations will become increasingly important.

The journey has just begun, and the best is yet to come.`,
      coverImage: '/images/ai-future.jpg',
      category: 'Artificial Intelligence',
      tags: ['machine learning', 'neural networks', 'industry 4.0', 'healthcare', 'finance'],
      readTime: 8,
      published: true,
      featured: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      author: {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah@fazzcodex.com',
        avatar: '/avatars/sarah.jpg',
        bio: 'AI Researcher with 10+ years of experience in machine learning and neural networks. Passionate about making AI accessible to everyone.',
        role: 'Senior AI Researcher',
        social: {
          twitter: '@sarahchen_ai',
          github: 'sarahchen',
          linkedin: 'sarahchen'
        }
      },
      stats: {
        views: 1234,
        likes: 234,
        comments: 45,
        shares: 12
      },
      relatedPosts: [
        {
          id: '2',
          title: 'Building Neural Networks from Scratch: A Comprehensive Guide',
          slug: 'building-neural-networks-scratch',
          excerpt: 'Learn the fundamentals of neural networks by building them from the ground up...',
          coverImage: '/images/neural-networks.jpg',
          category: 'Machine Learning',
          readTime: 12,
          createdAt: '2024-01-10T14:30:00Z',
          author: {
            name: 'Sarah Chen'
          }
        },
        {
          id: '3',
          title: 'Ethical AI: Balancing Innovation with Responsibility',
          slug: 'ethical-ai-innovation-responsibility',
          excerpt: 'As AI becomes more powerful, we must consider the ethical implications...',
          coverImage: '/images/ethical-ai.jpg',
          category: 'AI Ethics',
          readTime: 10,
          createdAt: '2024-01-08T09:15:00Z',
          author: {
            name: 'Dr. James Wilson'
          }
        }
      ]
    }

    setTimeout(() => {
      setPost(mockPost)
      setLikeCount(mockPost.stats.likes)
      setIsLoading(false)
    }, 1000)
  }, [params.slug])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = post?.title || 'Check out this article!'
    
    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        return
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading article...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-lg font-medium text-white hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          {/* Article Header */}
          <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Cover Image */}
            {post.coverImage && (
              <div className="aspect-video bg-gradient-to-br from-[#8B5CF6]/20 to-[#F472B6]/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-[#C084FC]" />
                </div>
              </div>
            )}

            <div className="p-8 lg:p-12">
              {/* Category and Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-full text-sm font-semibold text-white">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="px-3 py-1 bg-[#F472B6]/20 text-[#F472B6] rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C084FC] to-[#F472B6] flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{post.author.name}</h3>
                    <p className="text-sm text-gray-400">{post.author.role}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-[#F472B6]/20 text-[#F472B6]' 
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{likeCount}</span>
                  </button>
                  
                  <button
                    onClick={handleBookmark}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked 
                        ? 'bg-[#8B5CF6]/20 text-[#8B5CF6]' 
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  <div className="relative group">
                    <button className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-300 hover:bg-white/10 rounded transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-300 hover:bg-white/10 rounded transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-300 hover:bg-white/10 rounded transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-300 hover:bg-white/10 rounded transition-colors"
                      >
                        <Link2 className="w-4 h-4" />
                        Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-white leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                />
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.stats.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {likeCount} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.stats.comments} comments
                  </span>
                </div>

                <div className="text-sm text-gray-400">
                  Last updated: {formatDate(post.updatedAt)}
                </div>
              </div>
            </div>
          </article>

          {/* Author Bio */}
          <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#C084FC] to-[#F472B6] flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-white">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">About {post.author.name}</h3>
                <p className="text-gray-300 mb-4">{post.author.bio}</p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{post.author.role}</span>
                  {post.author.social?.twitter && (
                    <a
                      href={`https://twitter.com/${post.author.social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#C084FC] transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {post.author.social?.github && (
                    <a
                      href={`https://github.com/${post.author.social.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#C084FC] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {post.author.social?.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${post.author.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#C084FC] transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-[#8B5CF6]/50"
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#8B5CF6]/10 to-[#F472B6]/10 rounded-lg mb-4 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-[#C084FC]" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-[#C084FC]">
                        {relatedPost.category}
                      </span>
                      <span className="text-gray-400 text-sm">• {relatedPost.readTime} min read</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-[#C084FC] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{relatedPost.author.name}</span>
                      <span>{formatDate(relatedPost.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}