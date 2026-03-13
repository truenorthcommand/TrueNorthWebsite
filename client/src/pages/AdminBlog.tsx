import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Navbar from "@/components/Navbar";
import ParticleCanvas from "@/components/ParticleCanvas";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Check, X, Eye, MessageSquare, FileText } from "lucide-react";

type Tab = "posts" | "comments";

export default function AdminBlog() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("posts");
  const [editingPost, setEditingPost] = useState<any>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", category: "Operations", author: "Matthew Cottam", draft: true });

  const utils = trpc.useUtils();

  const { data: postsRaw, isLoading: postsLoading } = trpc.blog.adminList.useQuery({ page: 1, limit: 50 });
  const postsData: any[] = Array.isArray(postsRaw) ? postsRaw : ((postsRaw as any)?.posts ?? []);
  const { data: pendingComments } = trpc.blog.adminGetComments.useQuery({ status: "pending" });

  const createPost = trpc.blog.adminCreatePost.useMutation({
    onSuccess: () => { toast.success("Post created."); utils.blog.adminList.invalidate(); setShowNewPost(false); setForm({ title: "", slug: "", excerpt: "", content: "", category: "Operations", author: "Matthew Cottam", draft: true }); },
    onError: () => toast.error("Failed to create post."),
  });

  const updatePost = trpc.blog.adminUpdatePost.useMutation({
    onSuccess: () => { toast.success("Post updated."); utils.blog.adminList.invalidate(); setEditingPost(null); },
    onError: () => toast.error("Failed to update post."),
  });

  const deletePost = trpc.blog.adminDeletePost.useMutation({
    onSuccess: () => { toast.success("Post deleted."); utils.blog.adminList.invalidate(); },
    onError: () => toast.error("Failed to delete post."),
  });

  const approveComment = trpc.blog.adminApproveComment.useMutation({
    onSuccess: () => { toast.success("Comment approved."); utils.blog.adminGetComments.invalidate(); },
  });

  const rejectComment = trpc.blog.adminRejectComment.useMutation({
    onSuccess: () => { toast.success("Comment rejected."); utils.blog.adminGetComments.invalidate(); },
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: "#060b14" }}><div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#00FFFF", borderTopColor: "transparent" }} /></div>;
  if (!user) { window.location.href = getLoginUrl(); return null; }
  if (user.role !== "admin") return <div className="min-h-screen flex items-center justify-center" style={{ background: "#060b14" }}><p style={{ color: "#f0f4f8" }}>Access denied.</p></div>;

  const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8", fontFamily: "Inter, sans-serif" };

  const PostForm = ({ initial, onSave, onCancel }: { initial: any; onSave: (d: any) => void; onCancel: () => void }) => {
    const [d, setD] = useState(initial);
    return (
      <div className="glossy-card p-6 mb-6">
        <h3 className="font-display text-lg font-bold mb-4" style={{ color: "#f0f4f8" }}>{d.id ? "Edit Post" : "New Post"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <input placeholder="Title" value={d.title} onChange={(e) => setD({ ...d, title: e.target.value, slug: d.id ? d.slug : slugify(e.target.value) })} className="px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
          <input placeholder="Slug" value={d.slug} onChange={(e) => setD({ ...d, slug: e.target.value })} className="px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>
        <input placeholder="Excerpt" value={d.excerpt || ""} onChange={(e) => setD({ ...d, excerpt: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none mb-3" style={inputStyle} />
        <textarea placeholder="Content (HTML or plain text)" value={d.content} onChange={(e) => setD({ ...d, content: e.target.value })} rows={8} className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none mb-3" style={inputStyle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input placeholder="Category" value={d.category} onChange={(e) => setD({ ...d, category: e.target.value })} className="px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
          <input placeholder="Author" value={d.author} onChange={(e) => setD({ ...d, author: e.target.value })} className="px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
          <label className="flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <input type="checkbox" checked={!d.draft} onChange={(e) => setD({ ...d, draft: !e.target.checked, publishedAt: e.target.checked ? new Date() : undefined })} />
            <span className="text-sm" style={{ color: "#f0f4f8" }}>Published</span>
          </label>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onSave(d)} className="btn-primary"><Check size={14} /> Save</button>
          <button onClick={onCancel} className="btn-secondary"><X size={14} /> Cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#060b14" }}>
      <ParticleCanvas />
      <Navbar />
      <main className="relative" style={{ zIndex: 1, paddingTop: "100px" }}>
        <div className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-label mb-1">Admin</p>
              <h1 className="font-display text-3xl font-bold" style={{ color: "#f0f4f8" }}>Blog Dashboard</h1>
            </div>
            {tab === "posts" && (
              <button onClick={() => { setShowNewPost(true); setEditingPost(null); }} className="btn-primary">
                <Plus size={16} /> New Post
              </button>
            )}
          </div>

          <div className="flex gap-2 mb-8">
            {(["posts", "comments"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)} className="px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize" style={{ background: tab === t ? "rgba(0,255,255,0.12)" : "rgba(255,255,255,0.04)", border: tab === t ? "1px solid rgba(0,255,255,0.3)" : "1px solid rgba(255,255,255,0.08)", color: tab === t ? "#00FFFF" : "rgba(240,244,248,0.6)" }}>
                {t === "posts" ? <><FileText size={14} className="inline mr-1" />Posts ({postsData?.length ?? 0})</> : <><MessageSquare size={14} className="inline mr-1" />Pending ({pendingComments?.length ?? 0})</>}
              </button>
            ))}
          </div>

          {tab === "posts" && (
            <>
              {showNewPost && !editingPost && (
                <PostForm
                  initial={form}
                  onSave={(d) => createPost.mutate({ title: d.title, slug: d.slug, excerpt: d.excerpt, content: d.content, category: d.category, author: d.author, draft: d.draft, publishedAt: d.publishedAt })}
                  onCancel={() => setShowNewPost(false)}
                />
              )}
              {editingPost && (
                <PostForm
                  initial={editingPost}
                  onSave={(d) => updatePost.mutate({ id: d.id, title: d.title, slug: d.slug, excerpt: d.excerpt, content: d.content, category: d.category, author: d.author, draft: d.draft, publishedAt: d.publishedAt })}
                  onCancel={() => setEditingPost(null)}
                />
              )}
              {postsLoading ? (
                <div className="text-center py-12"><div className="w-6 h-6 border-2 rounded-full animate-spin mx-auto" style={{ borderColor: "#00FFFF", borderTopColor: "transparent" }} /></div>
              ) : (
                <div className="space-y-3">
                  {postsData?.map((post: any) => (
                    <div key={post.id} className="glossy-card p-5 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-semibold truncate" style={{ color: "#f0f4f8" }}>{post.title}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full shrink-0" style={{ background: post.draft ? "rgba(245,158,11,0.1)" : "rgba(0,255,255,0.08)", color: post.draft ? "#f59e0b" : "#00FFFF", border: `1px solid ${post.draft ? "rgba(245,158,11,0.2)" : "rgba(0,255,255,0.2)"}` }}>
                            {post.draft ? "Draft" : "Published"}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: "rgba(240,244,248,0.4)" }}>{post.category} · <Eye size={10} className="inline" /> {post.viewsCount} views</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => { setEditingPost(post); setShowNewPost(false); }} className="p-2 rounded-lg transition-all hover:bg-white/10" style={{ color: "rgba(240,244,248,0.6)" }}><Edit size={15} /></button>
                        <button onClick={() => { if (confirm("Delete this post?")) deletePost.mutate({ id: post.id }); }} className="p-2 rounded-lg transition-all hover:bg-red-500/10" style={{ color: "rgba(240,244,248,0.6)" }}><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === "comments" && (
            <div className="space-y-3">
              {!pendingComments?.length ? (
                <div className="text-center py-16 glossy-card">
                  <MessageSquare size={32} className="mx-auto mb-3" style={{ color: "rgba(240,244,248,0.2)" }} />
                  <p style={{ color: "rgba(240,244,248,0.4)" }}>No pending comments.</p>
                </div>
              ) : pendingComments.map((comment: any) => (
                <div key={comment.id} className="glossy-card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm" style={{ color: "#f0f4f8" }}>{comment.authorName}</span>
                        <span className="text-xs" style={{ color: "rgba(240,244,248,0.4)" }}>{comment.authorEmail}</span>
                      </div>
                      <p className="text-sm mb-2" style={{ color: "rgba(240,244,248,0.65)", lineHeight: "1.6" }}>{comment.content}</p>
                      <p className="text-xs" style={{ color: "rgba(240,244,248,0.35)" }}>{new Date(comment.createdAt).toLocaleDateString("en-GB")}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => approveComment.mutate({ commentId: comment.id })} className="p-2 rounded-lg transition-all" style={{ background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)", color: "#00FFFF" }}><Check size={15} /></button>
                      <button onClick={() => rejectComment.mutate({ commentId: comment.id })} className="p-2 rounded-lg transition-all" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}><X size={15} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
