# SEAL Training Center — Landing Page Plan

A single-page Swiss-style corporate landing page in Bahasa Indonesia for an Indonesian HSE & Oil & Gas training institution, optimized for B2B lead generation.

## Design System

Set up tokens in `src/styles.css` (Tailwind v4 `@theme`):
- Colors: Safety Orange `#FF6B00`, Turquoise `#00B7C2`, Charcoal `#1F2937`, Dark Gray `#374151`, Medium Gray `#6B7280`, Light Gray `#F5F7FA`, White.
- Typography: Inter (loaded via `<link>` in `__root.tsx`). H1 64–72px bold tight, H2 48px, H3 32px, body 18px, caption 14px.
- Strict 12-column grid, generous whitespace (≥70%), sharp corners (no rounded), thin hairline dividers, no gradients/glass/neumorphism.
- Subtle motion only: fade-up on scroll, counter animation, hover elevation, button hover. No parallax or flashy effects.

## Route & Structure

Single route `src/routes/index.tsx` with SEO `head()` (title, meta description, OG tags). Sticky top nav with mega menu for Training Programs. Floating WhatsApp button. Sections built as small components under `src/components/landing/`:

1. **Hero** — split 60/40. Left: H1 headline, sub, primary (Safety Orange) + secondary outlined CTAs, 4 trust checkmarks. Right: industrial training photo (generated) + overlay metric card (5000+ / 100+ / 95%).
2. **Why Choose Us** — 4-column grid with line icons (Lucide), thin top rule per card.
3. **Training Programs** — 8 program cards in 4-col grid: name, brief desc, duration, certification badge, "Detail Program" link.
4. **Process** — horizontal 5-step flow with large numbered blocks and connecting hairline.
5. **Corporate Training** — full-bleed Charcoal Black band, white type, 4 feature ticks, orange CTA.
6. **Certification & Compliance** — standards row + certificate verification input with "Verifikasi" button.
7. **Testimonials** — 3 corporate cards (photo, name, position, company, quote) + client logo strip.
8. **Training Schedule** — clean data table (Program / Tanggal / Lokasi / Kuota / Status + Daftar CTA).
9. **Blog & Insights** — 3 article cards.
10. **Lead Gen CTA** — full-bleed Safety Orange block, large headline, WhatsApp + Request Proposal buttons.
11. **Contact** — split: contact info + Google Maps embed | inquiry form (Nama, Perusahaan, Email, HP, Jenis Pelatihan select, Pesan).
12. **Footer** — company desc, quick links, programs, social, contact, copyright.

## Assets

Generate via imagegen (standard quality), stored in `src/assets/`:
- Hero: industrial HSE training scene (fire fighting / H2S drill).
- 3 testimonial portraits (professional).
- 3 blog cover images.

## Technical Notes

- Form submit: client-side validation only; no backend (Lovable Cloud not enabled). Form shows a toast acknowledging the request and links to WhatsApp. (Confirm with user if they want real submission storage — see question below.)
- Counter animation uses IntersectionObserver + simple rAF tween.
- All copy in Bahasa Indonesia as specified.
- Accessibility: semantic landmarks, single H1, alt text, focus rings, sufficient contrast.

## Open Question

The form and "Daftar Sekarang" buttons currently have no backend. Should I (a) keep them as WhatsApp/email handoffs only, or (b) enable Lovable Cloud to actually store leads & registrations in a database? I'll proceed with (a) unless you say otherwise.
