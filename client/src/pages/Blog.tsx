import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ParticleCanvas from "@/components/ParticleCanvas";
import { Search, Calendar, Eye, Tag, ArrowRight } from "lucide-react";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { data, isLoading } = trpc.blog.list.useQuery({
    page,
    limit: 9,
    search: search || undefined,
    category: category || undefined,
    sortBy: "date",
  });

  const { data: categories } = trpc.blog.categories.useQuery();

  return (
    <div className="min-h-screen relative" style={{ background: "#060b14" }}>
      <ParticleCanvas />
      <Navbar />
      <main className="relative" style={{ zIndex: 1, paddingTop: "100px" }}>
        <div className="container py-16">
          <div className="text-center mb-14 animate-on-scroll">
            <p className="section-label mb-3">Insights & Intelligence</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: "#f0f4f8" }}>
              The TrueNorth <span style={{ color: "#00FFFF" }}>Blog</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(240,244,248,0.55)" }}>
              Operational intelligence, AI implementation guides, and systems thinking for founders and operators.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,244,248,0.4)" }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8", fontFamily: "Inter, sans-serif" }}
              />
            </div>
            <select
              value={category || ""}
              onChange={(e) => { setCategory(e.target.value || undefined); setPage(1); }}
              className="px-4 py-3 rounded-lg text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8", fontFamily: "Inter, sans-serif" }}
            >
              <option value="">All Categories</option>
              {categories?.map((cat: string) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glossy-card p-6 animate-pulse" style={{ height: "280px" }} />
              ))}
            </div>
          ) : !data?.posts?.length ? (
            <div className="text-center py-20">
              <p style={{ color: "rgba(240,244,248,0.4)" }}>No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.posts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="glossy-card p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    {post.featuredImage && (
                      <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(0,255,255,0.08)", color: "#00FFFF", border: "1px solid rgba(0,255,255,0.2)" }}>
                        <Tag size={10} className="inline mr-1" />{post.category}
                      </span>
                    </div>
                    <h2 className="font-display text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors" style={{ color: "#f0f4f8" }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm mb-4 flex-1" style={{ color: "rgba(240,244,248,0.55)", lineHeight: "1.6" }}>
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center gap-3 text-xs" style={{ color: "rgba(240,244,248,0.4)" }}>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Draft"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={11} />{post.viewsCount ?? 0}
                        </span>
                      </div>
                      <ArrowRight size={14} style={{ color: "#00FFFF" }} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {data && data.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg text-sm transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: page === 1 ? "rgba(240,244,248,0.3)" : "#f0f4f8" }}
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm" style={{ color: "rgba(240,244,248,0.55)" }}>
                Page {page} of {data.totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="px-4 py-2 rounded-lg text-sm transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: page === data.totalPages ? "rgba(240,244,248,0.3)" : "#f0f4f8" }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
