# Realtor Adedayo — Personal Real Estate Sales & Marketing Platform

This is the first coded MVP for a personal real estate marketing website for the Realtor Adedayo brand. It is built with Next.js and is designed for Vercel deployment.

## Important: preview data, not live inventory

The property cards, prices, developer names and documentation statuses are **illustrative sample data**. The detail panel now exposes fields for developer/authorized seller, estate/project, title/tenure, documentation and payment plan; replace all placeholders with verified information before publishing. Replace them with properties you are authorized to market and have verified. The enquiry form currently demonstrates form handling by downloading a JSON file; it does **not** store leads in a database, email you, or call n8n yet. Do not publish it as a production lead-capture system until the backend and privacy controls are configured.

## Included in this starter

- Responsive real estate marketing homepage
- Search by text, city, property type, and illustrative budget range
- Property detail modal with size/layout, estate/project, title/tenure, documentation, payment-plan and developer/authorized-seller fields
- Property inquiry form UX
- Location, buying process, and diaspora sections
- SEO metadata foundation
- Next.js/Vercel-ready project structure
- Environment variable template
- Supabase schema draft for properties, leads, follow-ups, and commission records

## Run locally

1. Install Node.js 20 or newer.
2. Extract this folder.
3. In the project folder run:

   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```

4. Open `http://localhost:3000`.

## Deploy to Vercel

1. Upload the project to a new GitHub repository.
2. In Vercel choose **Add New → Project** and import the repository.
3. Keep the detected Next.js settings.
4. Deploy the preview.
5. Do not connect a custom domain or advertise it as a live business site until you have replaced sample content and completed backend configuration.

## Next production steps

1. Replace the placeholder brand name, contact details, images, and sample listings.
2. Create a Supabase project and run `supabase/schema.sql`.
3. Add the public Supabase URL and anon key in Vercel environment variables.
4. Implement server-side lead intake and RLS policies before storing customer information.
5. Add Supabase Auth and strict authorization for the private admin dashboard.
6. Add email delivery and authenticated n8n webhook handling on the server.
7. Add anti-spam/rate limiting, privacy and consent handling, backup/recovery, and error logging.
8. Configure a real domain and Google Search Console.

## Environment variables

See `.env.example`. Never commit secrets to GitHub. Do not put Supabase service-role keys or private n8n webhook secrets in client-side code.

## SEO note

This starter includes basic metadata. Add a dynamic sitemap, robots.txt, canonical URLs, property-specific metadata, structured data only where accurate, Search Console verification, and original location content before treating SEO as complete.
