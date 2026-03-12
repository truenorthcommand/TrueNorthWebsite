import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getBlogPosts,
  getBlogPostBySlug,
  getBlogCategories,
  getPostComments,
  createComment,
  incrementPostViews,
  getAllBlogPosts,
  getAllComments,
  updateCommentStatus,
  deleteComment,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../db-blog";

export const blogRouter = router({
  // Public procedures
  list: publicProcedure
    .input(
      z.object({
        page: z.number().int().positive().default(1),
        limit: z.number().int().min(1).max(50).default(10),
        search: z.string().optional(),
        category: z.string().optional(),
        sortBy: z.enum(["date", "views"]).default("date"),
      })
    )
    .query(({ input }) => getBlogPosts(input)),

  categories: publicProcedure.query(() => getBlogCategories()),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await getBlogPostBySlug(input.slug);
      if (post) {
        // Increment views
        await incrementPostViews(post.id);
      }
      return post;
    }),

  getComments: publicProcedure
    .input(z.object({ postId: z.number().int() }))
    .query(({ input }) => getPostComments(input.postId)),

  submitComment: publicProcedure
    .input(
      z.object({
        postId: z.number().int(),
        authorName: z.string().min(1).max(255),
        authorEmail: z.string().email(),
        content: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: Add abuse filtering here before creating comment
      return createComment(input);
    }),

  // Admin procedures
  adminList: protectedProcedure
    .input(z.object({ category: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getAllBlogPosts(input);
    }),

  adminGetComments: protectedProcedure
    .input(
      z.object({
        status: z.enum(["pending", "approved", "rejected"]).optional(),
        postId: z.number().int().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getAllComments(input);
    }),

  adminApproveComment: protectedProcedure
    .input(z.object({ commentId: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return updateCommentStatus(input.commentId, "approved");
    }),

  adminRejectComment: protectedProcedure
    .input(z.object({ commentId: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return updateCommentStatus(input.commentId, "rejected");
    }),

  adminDeleteComment: protectedProcedure
    .input(z.object({ commentId: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return deleteComment(input.commentId);
    }),

  adminCreatePost: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        slug: z.string().min(1).max(255),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        featuredImage: z.string().optional(),
        author: z.string().min(1).max(255),
        category: z.string().min(1).max(100),
        draft: z.boolean().default(true),
        publishedAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return createBlogPost(input);
    }),

  adminUpdatePost: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        featuredImage: z.string().optional(),
        author: z.string().optional(),
        category: z.string().optional(),
        draft: z.boolean().optional(),
        publishedAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const { id, ...updates } = input;
      return updateBlogPost(id, updates);
    }),

  adminDeletePost: protectedProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return deleteBlogPost(input.id);
    }),
});
