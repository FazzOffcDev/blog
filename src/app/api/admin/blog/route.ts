import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (status === 'published') {
      where.published = true
    } else if (status === 'draft') {
      where.published = false
    } else if (status === 'featured') {
      where.featured = true
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } }
      ]
    }

    // Get posts with author and stats
    const posts = await db.blogPost.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    // Get total count for pagination
    const total = await db.blogPost.count({ where })

    // Format response
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags ? JSON.parse(post.tags) : [],
      coverImage: post.coverImage,
      published: post.published,
      featured: post.featured,
      readTime: post.readTime,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      author: post.author,
      stats: {
        views: Math.floor(Math.random() * 5000) + 100,
        likes: post._count.likes,
        comments: post._count.comments,
        shares: Math.floor(Math.random() * 100) + 1
      }
    }))

    return NextResponse.json({
      posts: formattedPosts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, tags, coverImage, readTime, published, featured, authorId } = body

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Create new blog post
    const newPost = await db.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        tags: tags ? JSON.stringify(tags) : null,
        coverImage,
        readTime,
        published: published || false,
        featured: featured || false,
        authorId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      post: {
        id: newPost.id,
        title: newPost.title,
        slug: newPost.slug,
        excerpt: newPost.excerpt,
        content: newPost.content,
        category: newPost.category,
        tags: newPost.tags ? JSON.parse(newPost.tags) : [],
        coverImage: newPost.coverImage,
        published: newPost.published,
        featured: newPost.featured,
        readTime: newPost.readTime,
        createdAt: newPost.createdAt.toISOString(),
        updatedAt: newPost.updatedAt.toISOString(),
        author: newPost.author,
        stats: {
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0
        }
      }
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}