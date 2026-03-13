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

const OWNER_EMAIL = "matt@truenorthoperationsgroup.com";

const N8N_WEBHOOK_URL = "https://truenorthops.app.n8n.cloud/webhook/blog-comment-notification";

async function triggerCommentWebhook(data: {
  commentId: number;
  postId: number;
  authorName: string;
  authorEmail: string;
  content: string;
  status: string;
}) {
  // Use env var if valid, otherwise fall back to hardcoded URL
  const envUrl = process.env.N8N_COMMENT_WEBHOOK_URL;
  const webhookUrl = (envUrl && envUrl.startsWith("http")) ? envUrl : N8N_WEBHOOK_URL;
  console.log("[n8n webhook] Firing to:", webhookUrl.substring(0, 50));
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("[n8n webhook] Failed to notify:", err);
  }
}

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
      // Auto-approve comments from the owner
      const isOwner = input.authorEmail.toLowerCase() === OWNER_EMAIL.toLowerCase();
      const result = await createComment({ ...input, status: isOwner ? "approved" : "pending" });
      const commentId = (result as any).insertId || 0;
      // Trigger n8n notification for non-owner comments
      if (!isOwner) {
        await triggerCommentWebhook({
          commentId,
          postId: input.postId,
          authorName: input.authorName,
          authorEmail: input.authorEmail,
          content: input.content,
          status: "pending",
        });
      }
      return { success: true, autoApproved: isOwner };
    }),


  // Admin procedures
  adminList: protectedProcedure
    .input(
      z.object({
        category: z.string().optional(),
        page: z.number().int().positive().optional(),
        limit: z.number().int().min(1).max(100).optional(),
      })
    )
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
