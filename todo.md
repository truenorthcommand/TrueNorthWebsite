# TrueNorth Website TODO

## Core Website
- [x] Hero section with particle network animation
- [x] Portfolio section (TrueNorthOS + Kelly's PA)
- [x] Marketplace section (CV Studio + demand generation form)
- [x] Services section (6 tiers)
- [x] Process section (Diagnose/Design/Deploy)
- [x] About section
- [x] Contact form
- [x] Footer
- [x] Navbar with all navigation links

## Operations Efficiency Audit Tool
- [x] 6 customer segments (S1–S6)
- [x] 6 tailored questions per segment
- [x] Animated score dial
- [x] Email capture
- [x] n8n webhook integration (audit submissions → Google Sheets + Gmail)

## Blog System
- [x] Database schema (posts + comments tables)
- [x] tRPC backend API (public + admin procedures)
- [x] Blog list page (/blog) with search, filtering, pagination
- [x] Individual blog post page (/blog/:slug) with comments
- [x] Blog link in Navbar
- [x] Admin dashboard (/admin/blog) with post management and comment moderation
- [x] Seed 4 TrueNorth-voice blog posts
- [x] Auto-approve comments from matt@truenorthoperationsgroup.com
- [x] n8n comment notification workflow (ID: 7nBjxnduTYP6XTJb)
- [x] N8N_COMMENT_WEBHOOK_URL env var wired to backend

## Pending / Future
- [ ] Rich text editor (TipTap) for post content in admin dashboard
- [ ] AI content creator agent (bi-weekly post generation)
- [ ] Slack integration for comment notifications (alternative to email)
- [ ] Comment abuse filtering (profanity/discriminatory content check)
- [ ] Blog section link in homepage footer
- [ ] Admin dashboard link in navbar (for logged-in admin users)
