import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postIds, action, data } = body

    if (!postIds || !Array.isArray(postIds) || postIds.length === 0) {
      return NextResponse.json(
        { error: 'No post IDs provided' },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case 'delete':
        result = await db.blogPost.deleteMany({
          where: {
            id: {
              in: postIds
            }
          }
        })
        return NextResponse.json({
          success: true,
          message: `Deleted ${result.count} posts successfully`,
          deletedCount: result.count
        })

      case 'publish':
        result = await db.blogPost.updateMany({
          where: {
            id: {
              in: postIds
            }
          },
          data: {
            published: true
          }
        })
        return NextResponse.json({
          success: true,
          message: `Published ${result.count} posts successfully`,
          updatedCount: result.count
        })

      case 'unpublish':
        result = await db.blogPost.updateMany({
          where: {
            id: {
              in: postIds
            }
          },
          data: {
            published: false
          }
        })
        return NextResponse.json({
          success: true,
          message: `Unpublished ${result.count} posts successfully`,
          updatedCount: result.count
        })

      case 'feature':
        result = await db.blogPost.updateMany({
          where: {
            id: {
              in: postIds
            }
          },
          data: {
            featured: true
          }
        })
        return NextResponse.json({
          success: true,
          message: `Featured ${result.count} posts successfully`,
          updatedCount: result.count
        })

      case 'unfeature':
        result = await db.blogPost.updateMany({
          where: {
            id: {
              in: postIds
            }
          },
          data: {
            featured: false
          }
        })
        return NextResponse.json({
          success: true,
          message: `Unfeatured ${result.count} posts successfully`,
          updatedCount: result.count
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error performing bulk operation:', error)
    return NextResponse.json(
      { error: 'Failed to perform bulk operation' },
      { status: 500 }
    )
  }
}