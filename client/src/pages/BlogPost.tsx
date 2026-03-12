import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const [commentForm, setCommentForm] = useState({
    authorName: "",
    authorEmail: "",
    content: "",
  });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const { data: post, isLoading: postLoading } = trpc.blog.getBySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  const { data: comments = [], refetch: refetchComments } = trpc.blog.getComments.useQuery(
    { postId: post?.id || 0 },
    { enabled: !!post?.id }
  );

  const submitCommentMutation = trpc.blog.submitComment.useMutation({
    onSuccess: () => {
      setCommentForm({ authorName: "", authorEmail: "", content: "" });
      toast.success("Comment submitted! It will appear after moderation.");
      refetchComments();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit comment");
    },
  });

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    if (!commentForm.authorName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!commentForm.authorEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!commentForm.content.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setIsSubmittingComment(true);
    try {
      await submitCommentMutation.mutateAsync({
        postId: post.id,
        authorName: commentForm.authorName,
        authorEmail: commentForm.authorEmail,
        content: commentForm.content,
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <Button variant="ghost" onClick={() => navigate("/blog")} className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Post not found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate("/blog")} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>By {post.author}</span>
              <span>{format(new Date(post.publishedAt || post.createdAt), "MMMM d, yyyy")}</span>
              <span>{post.viewsCount} views</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{post.category}</Badge>
            </div>
          </header>

          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          <div className="prose prose-invert max-w-none mb-12">
            <div
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </article>

        <div className="border-t border-border my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Comments ({comments.length})
          </h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Leave a Comment</CardTitle>
              <CardDescription>Your comment will be reviewed before appearing on the site.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={commentForm.authorName}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, authorName: e.target.value })
                    }
                    disabled={isSubmittingComment}
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={commentForm.authorEmail}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, authorEmail: e.target.value })
                    }
                    disabled={isSubmittingComment}
                  />
                </div>
                <Textarea
                  placeholder="Your comment..."
                  value={commentForm.content}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, content: e.target.value })
                  }
                  disabled={isSubmittingComment}
                  rows={5}
                />
                <Button type="submit" disabled={isSubmittingComment}>
                  {isSubmittingComment ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Comment"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{comment.authorName}</CardTitle>
                        <CardDescription>
                          {format(new Date(comment.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap">{comment.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
