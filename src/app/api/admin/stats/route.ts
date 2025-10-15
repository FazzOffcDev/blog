import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      featuredPosts,
      totalUsers,
      totalComments,
      totalLikes
    ] = await Promise.all([
      db.blogPost.count(),
      db.blogPost.count({ where: { published: true } }),
      db.blogPost.count({ where: { published: false } }),
      db.blogPost.count({ where: { featured: true } }),
      db.user.count(),
      db.comment.count(),
      db.like.count()
    ])

    const postsByCategory = await db.blogPost.groupBy({
      by: ['category'],
      _count: {
        category: true
      }
    })

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentPosts = await db.blogPost.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    })

    const recentUsers = await db.user.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    })

    return NextResponse.json({
      overview: {
        totalPosts,
        publishedPosts,
        draftPosts,
        featuredPosts,
        totalUsers,
        totalComments,
        totalLikes
      },
      postsByCategory: postsByCategory.map(item => ({
        category: item.category,
        count: item._count.category
      })),
      recentActivity: {
        recentPosts,
        recentUsers
      }
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    )
  }
}