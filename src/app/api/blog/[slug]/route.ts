import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await db.blogPost.findUnique({
      where: { slug: params.slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
            role: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    })

    if (!post || !post.published) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    const relatedPosts = await db.blogPost.findMany({
      where: {
        category: post.category,
        published: true,
        id: { not: post.id }
      },
      include: {
        author: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 3
    })

    const formattedPost = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags ? JSON.parse(post.tags) : [],
      coverImage: post.coverImage,
      readTime: post.readTime,
      featured: post.featured,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      author: post.author,
      stats: {
        views: Math.floor(Math.random() * 5000) + 100,
        likes: post._count.likes,
        comments: post._count.comments,
        shares: Math.floor(Math.random() * 100) + 1
      },
      relatedPosts: relatedPosts.map(relatedPost => ({
        id: relatedPost.id,
        title: relatedPost.title,
        slug: relatedPost.slug,
        excerpt: relatedPost.excerpt,
        coverImage: relatedPost.coverImage,
        category: relatedPost.category,
        readTime: relatedPost.readTime,
        createdAt: relatedPost.createdAt.toISOString(),
        author: relatedPost.author
      }))
    }

    return NextResponse.json(formattedPost)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}