import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Edit, Trash2, CheckCircle, XCircle, Eye, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useLocation } from "wouter";

const CATEGORIES = [
  "Operations",
  "AI & Automation",
  "Case Studies",
  "Strategy",
  "Systems Design",
  "Tools & Tech",
];

type PostForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featuredImage: string;
  draft: boolean;
};

const emptyForm: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Operations",
  author: "Matthew Cottam",
  featuredImage: "",
  draft: true,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminBlog() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("posts");
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [postForm, setPostForm] = useState<PostForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const utils = trpc.useUtils();

  // Posts — admin list (all posts, including drafts)
  const { data: posts = [], isLoading: postsLoading } = trpc.blog.adminList.useQuery({});

  // Comments — pending only
  const { data: pendingComments = [], isLoading: commentsLoading } =
    trpc.blog.adminGetComments.useQuery({ status: "pending" });

  const createPost = trpc.blog.adminCreatePost.useMutation({
    onSuccess: () => {
      toast.success("Post created");
      utils.blog.adminList.invalidate();
      setShowPostDialog(false);
      setPostForm(emptyForm);
    },
    onError: (e) => toast.error(e.message),
  });

  const updatePost = trpc.blog.adminUpdatePost.useMutation({
    onSuccess: () => {
      toast.success("Post updated");
      utils.blog.adminList.invalidate();
      setShowPostDialog(false);
      setEditingPostId(null);
      setPostForm(emptyForm);
    },
    onError: (e) => toast.error(e.message),
  });

  const deletePost = trpc.blog.adminDeletePost.useMutation({
    onSuccess: () => {
      toast.success("Post deleted");
      utils.blog.adminList.invalidate();
      setDeleteConfirmId(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const approveComment = trpc.blog.adminApproveComment.useMutation({
    onSuccess: () => {
      toast.success("Comment approved");
      utils.blog.adminGetComments.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const rejectComment = trpc.blog.adminRejectComment.useMutation({
    onSuccess: () => {
      toast.success("Comment rejected");
      utils.blog.adminGetComments.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSavePost = async () => {
    if (!postForm.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!postForm.content.trim()) {
      toast.error("Content is required");
      return;
    }
    setIsSaving(true);
    try {
      if (editingPostId) {
        await updatePost.mutateAsync({ id: editingPostId, ...postForm });
      } else {
        await createPost.mutateAsync(postForm);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const openEdit = (post: any) => {
    setEditingPostId(post.id);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      category: post.category,
      author: post.author,
      featuredImage: post.featuredImage || "",
      draft: post.draft,
    });
    setShowPostDialog(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.04 240)" }}>
      {/* Header */}
      <div
        className="border-b sticky top-0 z-10"
        style={{ borderColor: "oklch(1 0 0 / 8%)", background: "oklch(0.14 0.04 240)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-lg font-semibold text-white">Blog Admin</h1>
          </div>
          <Button
            onClick={() => {
              setEditingPostId(null);
              setPostForm(emptyForm);
              setShowPostDialog(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="comments">
              Pending Comments
              {pendingComments.length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {pendingComments.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ── POSTS TAB ── */}
          <TabsContent value="posts">
            {postsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : posts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No posts yet.</p>
                  <Button
                    onClick={() => {
                      setEditingPostId(null);
                      setPostForm(emptyForm);
                      setShowPostDialog(true);
                    }}
                  >
                    Create your first post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {posts.map((post: any) => (
                  <Card
                    key={post.id}
                    style={{
                      borderColor: "oklch(1 0 0 / 8%)",
                      background: "oklch(0.16 0.04 240)",
                    }}
                  >
                    <CardContent className="py-4 px-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-white truncate">{post.title}</h3>
                            <Badge
                              variant={post.draft ? "secondary" : "default"}
                              className="text-xs shrink-0"
                            >
                              {post.draft ? "Draft" : "Published"}
                            </Badge>
                            <Badge variant="outline" className="text-xs shrink-0">
                              {post.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {post.author} &middot;{" "}
                            {format(new Date(post.createdAt), "MMM d, yyyy")} &middot;{" "}
                            {post.viewsCount} views
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEdit(post)}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteConfirmId(post.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── COMMENTS TAB ── */}
          <TabsContent value="comments">
            {commentsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : pendingComments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending comments. All caught up.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingComments.map((comment: any) => (
                  <Card
                    key={comment.id}
                    style={{
                      borderColor: "oklch(1 0 0 / 8%)",
                      background: "oklch(0.16 0.04 240)",
                    }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-base text-white">
                            {comment.authorName}
                          </CardTitle>
                          <CardDescription>
                            {comment.authorEmail} &middot;{" "}
                            {format(new Date(comment.createdAt), "MMM d, yyyy 'at' h:mm a")}
                          </CardDescription>
                          <CardDescription className="mt-1">
                            Post ID: <span className="text-teal-400">#{comment.postId}</span>
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-500 border-green-500/30 hover:bg-green-500/10"
                            onClick={() => approveComment.mutate({ commentId: comment.id })}
                            disabled={approveComment.isPending}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 border-red-500/30 hover:bg-red-500/10"
                            onClick={() => rejectComment.mutate({ commentId: comment.id })}
                            disabled={rejectComment.isPending}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground whitespace-pre-wrap bg-muted/20 rounded-md p-3">
                        {comment.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* ── POST CREATE / EDIT DIALOG ── */}
      <Dialog
        open={showPostDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowPostDialog(false);
            setEditingPostId(null);
            setPostForm(emptyForm);
          }
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPostId ? "Edit Post" : "New Post"}</DialogTitle>
            <DialogDescription>Fill in the post details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input
                  placeholder="Post title"
                  value={postForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setPostForm((f) => ({
                      ...f,
                      title,
                      slug: editingPostId ? f.slug : slugify(title),
                    }));
                  }}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Slug</label>
                <Input
                  placeholder="url-friendly-slug"
                  value={postForm.slug}
                  onChange={(e) => setPostForm((f) => ({ ...f, slug: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select
                  value={postForm.category}
                  onValueChange={(v) => setPostForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Author</label>
                <Input
                  value={postForm.author}
                  onChange={(e) => setPostForm((f) => ({ ...f, author: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select
                  value={postForm.draft ? "draft" : "published"}
                  onValueChange={(v) => setPostForm((f) => ({ ...f, draft: v === "draft" }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Excerpt</label>
                <Textarea
                  placeholder="Short summary shown in the blog list..."
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={2}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Featured Image URL</label>
                <Input
                  placeholder="https://..."
                  value={postForm.featuredImage}
                  onChange={(e) => setPostForm((f) => ({ ...f, featuredImage: e.target.value }))}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Content (HTML)</label>
                <Textarea
                  placeholder="Write your post content here... HTML is supported."
                  value={postForm.content}
                  onChange={(e) => setPostForm((f) => ({ ...f, content: e.target.value }))}
                  rows={14}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPostDialog(false);
                setEditingPostId(null);
                setPostForm(emptyForm);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePost} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : editingPostId ? (
                "Save Changes"
              ) : (
                "Create Post"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── DELETE CONFIRM DIALOG ── */}
      <Dialog
        open={!!deleteConfirmId}
        onOpenChange={(open) => {
          if (!open) setDeleteConfirmId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              This will permanently delete the post and all its comments. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteConfirmId) deletePost.mutate({ id: deleteConfirmId });
              }}
              disabled={deletePost.isPending}
            >
              {deletePost.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
