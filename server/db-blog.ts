import { eq, desc, and, like, sql } from "drizzle-orm";
import { blogPosts, blogComments, BlogPost, BlogComment } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Get published blog posts with pagination and search
 */
export async function getBlogPosts(options: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: "date" | "views";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const page = options.page || 1;
  const limit = options.limit || 10;
  const offset = (page - 1) * limit;

  const conditions = [eq(blogPosts.draft, false)];

  // Filter by search
  if (options.search) {
    conditions.push(
      sql`MATCH(${blogPosts.title}, ${blogPosts.excerpt}, ${blogPosts.content}) AGAINST(${options.search} IN BOOLEAN MODE)`
    );
  }

  // Filter by category
  if (options.category) {
    conditions.push(eq(blogPosts.category, options.category));
  }

  // Sort
  const sortColumn = options.sortBy === "views" ? blogPosts.viewsCount : blogPosts.publishedAt;

  const posts = await db
    .select()
    .from(blogPosts)
    .where(and(...conditions))
    .orderBy(desc(sortColumn))
    .limit(limit)
    .offset(offset);

  // Get total count for pagination
  const countResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(blogPosts)
    .where(eq(blogPosts.draft, false));

  const total = countResult[0]?.count || 0;

  return {
    posts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.draft, false)))
    .limit(1);

  return result[0] || null;
}

/**
 * Get all categories
 */
export async function getBlogCategories() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .selectDistinct({ category: blogPosts.category })
    .from(blogPosts)
    .where(eq(blogPosts.draft, false))
    .orderBy(blogPosts.category);

  return result.map((r) => r.category);
}

/**
 * Get approved comments for a post
 */
export async function getPostComments(postId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(blogComments)
    .where(and(eq(blogComments.postId, postId), eq(blogComments.status, "approved")))
    .orderBy(desc(blogComments.createdAt));

  return result;
}

/**
 * Create a new comment
 */
export async function createComment(comment: {
  postId: number;
  authorName: string;
  authorEmail: string;
  content: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(blogComments).values({
    ...comment,
    status: "pending",
  });

  return result;
}

/**
 * Increment post view count
 */
export async function incrementPostViews(postId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(blogPosts)
    .set({ viewsCount: sql`${blogPosts.viewsCount} + 1` })
    .where(eq(blogPosts.id, postId));
}

/**
 * Get all blog posts (admin only)
 */
export async function getAllBlogPosts(options?: { category?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions = [];
  if (options?.category) {
    conditions.push(eq(blogPosts.category, options.category));
  }

  const query = db
    .select()
    .from(blogPosts)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(blogPosts.publishedAt));

  return query;
}

/**
 * Get all comments (admin only)
 */
export async function getAllComments(options?: { status?: string; postId?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions = [];
  if (options?.status) {
    conditions.push(eq(blogComments.status, options.status as any));
  }
  if (options?.postId) {
    conditions.push(eq(blogComments.postId, options.postId));
  }

  const query = db
    .select()
    .from(blogComments)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(blogComments.createdAt));

  return query;
}

/**
 * Update comment status (admin only)
 */
export async function updateCommentStatus(commentId: number, status: "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(blogComments).set({ status }).where(eq(blogComments.id, commentId));
}

/**
 * Delete comment (admin only)
 */
export async function deleteComment(commentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(blogComments).where(eq(blogComments.id, commentId));
}

/**
 * Create blog post (admin only)
 */
export async function createBlogPost(post: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  author: string;
  category: string;
  draft?: boolean;
  publishedAt?: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(blogPosts).values({
    ...post,
    draft: post.draft ?? true,
  });

  return result;
}

/**
 * Update blog post (admin only)
 */
export async function updateBlogPost(
  postId: number,
  updates: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    author: string;
    category: string;
    draft: boolean;
    publishedAt: Date;
  }>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(blogPosts).set(updates).where(eq(blogPosts.id, postId));
}

/**
 * Delete blog post (admin only)
 */
export async function deleteBlogPost(postId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Delete all comments first
  await db.delete(blogComments).where(eq(blogComments.postId, postId));

  // Then delete the post
  await db.delete(blogPosts).where(eq(blogPosts.id, postId));
}
