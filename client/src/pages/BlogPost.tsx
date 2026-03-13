import { useState } from "react";
import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ParticleCanvas from "@/components/ParticleCanvas";
import { Calendar, Eye, Tag, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery({ slug }, { enabled: !!slug });
  const { data: comments, refetch: refetchComments } = trpc.blog.getComments.useQuery(
    { postId: post?.id ?? 0 },
    { enabled: !!post?.id }
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const submitComment = trpc.blog.submitComment.useMutation({
    onSuccess: (data) => {
      toast.success(data.autoApproved ? "Comment posted." : "Comment submitted for review.");
      setName(""); setEmail(""); setContent("");
      refetchComments();
    },
    onError: () => toast.error("Failed to submit comment. Please try again."),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen relative" style={{ background: "#060b14" }}>
        <ParticleCanvas />
        <Navbar />
        <div className="container py-32 text-center" style={{ zIndex: 1, position: "relative" }}>
          <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto" style={{ borderColor: "#00FFFF", borderTopColor: "transparent" }} />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen relative" style={{ background: "#060b14" }}>
        <ParticleCanvas />
        <Navbar />
        <div className="container py-32 text-center" style={{ zIndex: 1, position: "relative" }}>
          <h1 className="font-display text-3xl font-bold mb-4" style={{ color: "#f0f4f8" }}>Post not found</h1>
          <Link href="/blog" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const approvedComments = comments?.filter((c: any) => c.status === "approved") ?? [];

  return (
    <div className="min-h-screen relative" style={{ background: "#060b14" }}>
      <ParticleCanvas />
      <Navbar />
      <main className="relative" style={{ zIndex: 1, paddingTop: "100px" }}>
        <div className="container py-16 max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-cyan-400" style={{ color: "rgba(240,244,248,0.5)" }}>
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          <div className="mb-6">
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(0,255,255,0.08)", color: "#00FFFF", border: "1px solid rgba(0,255,255,0.2)" }}>
              <Tag size={10} className="inline mr-1" />{post.category}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#f0f4f8", lineHeight: "1.2" }}>
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: "rgba(240,244,248,0.4)" }}>
            <span>By {post.author}</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Draft"}
            </span>
            <span className="flex items-center gap-1"><Eye size={12} />{post.viewsCount ?? 0} views</span>
          </div>

          {post.featuredImage && (
            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden mb-10">
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div
            className="prose-tn mb-16"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }}
            style={{ color: "rgba(240,244,248,0.8)", lineHeight: "1.8", fontFamily: "Inter, sans-serif" }}
          />

          <div className="glossy-card p-8">
            <h3 className="font-display text-xl font-bold mb-6" style={{ color: "#f0f4f8" }}>
              Comments ({approvedComments.length})
            </h3>

            {approvedComments.length > 0 && (
              <div className="space-y-4 mb-8">
                {approvedComments.map((comment: any) => (
                  <div key={comment.id} className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm" style={{ color: "#f0f4f8" }}>{comment.authorName}</span>
                      <span className="text-xs" style={{ color: "rgba(240,244,248,0.35)" }}>
                        {new Date(comment.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "rgba(240,244,248,0.65)", lineHeight: "1.6" }}>{comment.content}</p>
                  </div>
                ))}
              </div>
            )}

            <h4 className="font-display text-base font-semibold mb-4" style={{ color: "#f0f4f8" }}>Leave a Comment</h4>
            <form onSubmit={(e) => { e.preventDefault(); if (name && email && content) submitComment.mutate({ postId: post.id, authorName: name, authorEmail: email, content }); }} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8", fontFamily: "Inter, sans-serif" }} />
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8", fontFamily: "Inter, sans-serif" }} />
              </div>
              <textarea placeholder="Your comment..." value={content} onChange={(e) => setContent(e.target.value)} required rows={4} className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8", fontFamily: "Inter, sans-serif" }} />
              <button type="submit" disabled={submitComment.isPending} className="btn-primary justify-center self-start">
                {submitComment.isPending ? "Submitting..." : <><Send size={14} /> Post Comment</>}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
