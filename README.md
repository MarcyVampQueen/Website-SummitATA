# Summit ATA Martial Arts

Website for Summit ATA Martial Arts, a taekwondo school in Morristown, Tennessee, owned and operated by Melynda Cordry.

The goal is a fast, low-maintenance site that is inexpensive to host and lets Melynda update published copy and photos without editing code. The current student portal is not part of this site; student services will remain in the school's student management system.

## Direction

- Keep the recognizable red, blue, black, and white palette, with a cleaner layout, more breathing room, and strong photography.
- Use Astro to generate a static site. Start without a UI framework; add one only if an interactive feature needs it.
- Use Sanity as the hosted content management system (CMS). Astro does not include an admin portal. Sanity Studio provides an authenticated editor for published-site text and images.
- Host the generated static site on Cloudflare Pages. No application server, database, or student data is needed for the public website.
- Link trial-class calls to action to the existing booking or lead system rather than collecting personal information in a new form.

CMS access should be limited to Melynda's account. Enable multi-factor authentication, invite no other editors, and never put CMS credentials or the Cloudflare deploy-hook URL in client-side code or source control. The Sanity production dataset will contain public website content only; published content is publicly readable by design.

## Existing Site Content

The current homepage at [summitata.com](https://summitata.com) highlights:

- ATA Tigers for ages 4–6
- Karate for Kids for ages 7–12
- Teens & Adults for ages 13+
- Krav Maga
- Melynda's story and the school's focus on confidence and personal development
- Trial-class offers, testimonials, phone, location, and social links

These are a starting inventory, not a commitment to preserve every page or claim. Confirm current program names, age ranges, offers, schedule, contact details, and image permissions before launch. The student login/portal will not be recreated here.

## Architecture

1. Astro source code and Sanity content schemas live in GitHub.
2. Melynda edits all public copy, program details, offers, testimonials, contact/social links, and images in her authenticated Sanity Studio account.
3. Publishing content triggers a Sanity webhook to a Cloudflare Pages Deploy Hook. The hook URL is a secret and must be kept in Sanity's webhook settings, not in the repository or browser code.
4. Cloudflare Pages builds Astro, which reads published Sanity content at build time, then serves the generated static output from `dist/`.
5. Git pushes deploy code changes; pull requests can use Cloudflare preview deployments. CMS content publishes trigger a production rebuild without a code change.

Keep any required build-time Sanity read token in Cloudflare Pages environment variables. A public Sanity dataset may allow builds to read published content without a token; never use a write token in the site build or public browser code. Do not commit `.env` files.

Cloudflare Pages is the preferred host for its simple Git integration, CMS Deploy Hooks, and free static hosting limits suitable for this site. Current documented Free limits include 500 builds/month, 20,000 files per site, and 25 MiB per file; verify current limits before launch. The site has no request-time server compute. Use Terraform for DNS and other Cloudflare infrastructure where provider coverage is suitable, and keep infrastructure changes separate from routine content publishing. GitHub Actions can run code checks before changes merge.

## Local Setup

Install Node.js and npm first. Node.js 26 is the planned local runtime. Confirm the installation in a new terminal:

```sh
node --version
npm --version
```

Once Node.js is available, scaffold Astro in this repository. Select the current directory and the minimal starter when prompted, and keep the existing README:

```sh
npm create astro@latest
```

Choose the minimal starter and install dependencies when prompted. Then start the local development server using the script created in `package.json`:

```sh
npm run dev
```

After scaffolding, record the generated scripts and install the Sanity/Astro integration needed to define and fetch the site's content. Do not add a CMS token to the Astro client bundle.

## Content Editing

The intended editing boundary is all public text and images: site-wide contact details and social links, page copy, program descriptions and age ranges, calls to action and offers, testimonials, and image assets with alt text. Layout, page structure, styling, and navigation remain code changes. A content publish updates the live site after Cloudflare completes its rebuild; draft/live preview is not required for the first release.

## Deployment Checklist

- Create the GitHub repository and protect the production branch.
- Create the Sanity project and production dataset; configure Melynda's account with MFA and do not add other editors.
- Create a Cloudflare Pages project connected to the repository. Use `npm run build` and `dist` as the Astro build command and output directory.
- Add a build-time Sanity read token as a Cloudflare environment variable only if required for the selected dataset; never add a write token to site code or build variables.
- Create a Cloudflare Pages Deploy Hook and configure Sanity to call it only for published changes in the production dataset. Keep its unique URL secret.
- Configure the production domain and verify DNS, HTTPS, redirects, and any existing URL redirects before launch.
- Test desktop/mobile layouts, accessible navigation, images, contact links, social links, and a content edit from Melynda's account.
- Confirm no student portal route, login, student data, or sensitive CMS credentials are included in the public site.

## Open Decisions

- Identify the existing trial/lead booking URL.
- Confirm the source and usage permissions for existing photos, logo, testimonials, and program descriptions.
- Confirm the GitHub organization/account, production domain ownership, Cloudflare account, and which email/account Melynda will use for Sanity access.
