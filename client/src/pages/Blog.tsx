import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";

export default function Blog() {
  const [, navigate] = useLocation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<"date" | "views">("date");

  // Fetch posts
  const { data: postsData, isLoading: postsLoading } = trpc.blog.list.useQuery({
    page,
    limit: 10,
    search: search || undefined,
    category: selectedCategory,
    sortBy,
  });

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = trpc.blog.categories.useQuery();

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryFilter = (category: string | undefined) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Operations insights, automation strategies, and systems thinking from TrueNorth
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "views")}
            className="px-4 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="date">Newest First</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === undefined ? "default" : "outline"}
              onClick={() => handleCategoryFilter(undefined)}
              size="sm"
            >
              All Posts
            </Button>
            {categoriesLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => handleCategoryFilter(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 mb-12">
          {postsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : postsData?.posts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No posts found. Try adjusting your search or filters.</p>
              </CardContent>
            </Card>
          ) : (
            postsData?.posts.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePostClick(post.slug)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                      <CardDescription className="text-base">{post.excerpt}</CardDescription>
                    </div>
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>By {post.author}</span>
                      <span>{format(new Date(post.publishedAt || post.createdAt), "MMM d, yyyy")}</span>
                      <span>{post.viewsCount} views</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {postsData && postsData.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: postsData.totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(postsData.totalPages, p + 1))}
              disabled={page === postsData.totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
