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

## Intro Splash Screen (March 2026)
- [x] Upload logo animation video to CDN
- [x] Create IntroSplash component with video player and skip button
- [x] Add routing logic to show splash on first visit only (localStorage tracking)
- [x] Test intro splash on first visit and verify skip functionality
- [x] Auto-redirect to homepage after video completes

## Pending / Future
- [ ] Rich text editor (TipTap) for post content in admin dashboard
- [ ] AI content creator agent (bi-weekly post generation)
- [ ] Slack integration for comment notifications (alternative to email)
- [ ] Comment abuse filtering (profanity/discriminatory content check)
- [ ] Blog section link in homepage footer
- [ ] Admin dashboard link in navbar (for logged-in admin users)

## Hybrid Redesign (March 2026)
- [x] Upload AI-generated 3D icons to CDN (Blue/Gold/Teal)
- [x] Replace hero with three glossy gradient cards (Blue/Gold/Teal)
- [x] Keep particle network background from original
- [x] Update hero scrolling words to B2B + Solopreneur list (Founders/Operators/Scale-ups/Solopreneurs/Growth)
- [x] Update stats bar — From £497 entry (was £10/mo)
- [x] Remove £10/mo Students tier from Services
- [x] Update all service pricing to From pricing model
- [x] Add paid Discovery Call callout in Services section (From £150)
- [x] Update Portfolio badges to From pricing
- [ ] 8-week pricing review (due ~May 2026)
- [x] Replace inline SVG logo with extracted TrueNorth compass logo (white text, cyan #00FFFF)

## Clean Build v2 (March 2026)
- [x] Remove all legacy section components and pages — clean slate
- [x] Configure global CSS: TrueNorth design tokens, Space Grotesk + Inter fonts
- [x] Build Navbar: glassmorphism, compass logo CDN, all nav links
- [x] Build ParticleCanvas: teal nodes, connecting lines, 60fps, prefers-reduced-motion
- [x] Build Footer: logo, nav links, company info, Powered by TrueNorthOS
- [x] Build Hero: three glossy cards, AI 3D icons, scrolling words
- [x] Build Portfolio, Marketplace, AuditTool, Services, Process, About, Contact sections
- [x] Build Blog list, BlogPost, AdminBlog pages
- [x] Add auditSubmissions and contactSubmissions tables — db:push applied
- [x] Add contact, audit, marketplace tRPC routers
- [x] Fix AdminBlog postsData type alignment
- [ ] Add CTA click tracking for 8-week pricing review (due ~May 2026)
- [ ] Add real case study to Portfolio (specific client outcome + numbers)
- [ ] Connect Gmail credentials in n8n comment notification workflow
- [ ] Set up custom domain (truenorthoperationsgroup.com)
- [ ] Update navbar with new electric compass logo (transparent background, responsive sizing)
- [ ] Increase navbar logo size by 50%, expand navbar height to match, verify responsive
