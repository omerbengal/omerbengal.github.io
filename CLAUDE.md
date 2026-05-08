# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Omer Bengal, built as a multi-page static website using vanilla HTML, CSS, and JavaScript. The site features animated backgrounds, interactive components, and a responsive design with a mobile hamburger menu.

## Project Structure

```
/
├── index.html              # Homepage
├── pages/                  # Additional pages
│   ├── about-me.html
│   ├── education.html
│   ├── employment.html
│   ├── form.html          # Contact form
│   ├── hobbies.html
│   └── projects.html
├── css/
│   ├── generic.css         # Global styles (reset, fonts, layout)
│   ├── navbar/             # Navigation bar styles
│   ├── footer/             # Footer with social links (split into multiple files)
│   ├── index/              # Homepage-specific CSS
│   ├── about-me/           # About Me page + typing animation
│   ├── projects/           # Projects page + card component
│   ├── hobbies/            # Hobbies page
│   ├── employment/         # Employment page
│   ├── education/          # Education page
│   └── form/               # Contact form styles
├── js/
│   ├── no-transition-on-resize.js    # Disables CSS transitions during window resize
│   ├── footer/
│   │   └── footer-mobile-link-delay.js
│   ├── about-me/
│   │   └── typing.js                # "Coding is ___" typing animation
│   ├── projects/
│   │   └── cards.js                  # Project cards expand/collapse logic
│   ├── hobbies/
│   │   └── carusel.js               # Photo/video carousel
│   ├── employment/
│   │   └── lottieData.js            # Animation data
│   └── form/
│       └── form-submission.js       # Form handling + WhatsApp API
└── images/
```

## Architecture

### Page Organization
- Each page is self-contained with its own HTML file in `pages/` (except `index.html` at root)
- Shared components (navbar, footer) are duplicated across pages - there is no component system or templating
- CSS follows the same pattern: generic styles + page-specific styles
- JavaScript modules are loaded per-page as needed

### CSS Architecture
- **generic.css**: Global reset, CSS Grid layout for `html/body`, transition pause utility class
- **Component-based CSS**: Navbar and footer have their own directories with modular files
- **Page-specific CSS**: Each page has its own directory with `background.css` and page-specific styles
- **Responsive Design**: Heavy use of media queries for mobile (768px breakpoint) and various desktop sizes

### JavaScript Patterns
- **Vanilla JS with DOMContentLoaded**: All scripts use `document.addEventListener('DOMContentLoaded', ...)` pattern
- **Module pattern**: Each feature is in its own file (typing, carousel, cards, form)
- **No build system**: Direct browser execution, no bundling or transpilation

### Key Technical Details

**Navbar Mobile Menu:**
- Uses checkbox hack (`#check`) with CSS sibling selectors
- Media query at 768px switches between desktop horizontal nav and mobile hamburger menu
- Staggered animation delays using CSS custom property `--i`

**Backdrop Filter Blur:**
- Navbar and footer use `backdrop-filter: blur(50px)` for glassmorphism effect
- Known issue with `backdrop-filter` causing rendering problems - see git history for fixes

**Transition Pause on Resize:**
- `js/no-transition-on-resize.js` adds `.stop-transitions` class to body during resize
- Prevents jarring animations when crossing responsive breakpoints
- Works with `.stop-transitions * { transition: none !important; }` in generic.css

**Project Cards (pages/projects.html):**
- Expandable cards with click/hover/touch events
- Uses `expanded` class as state toggle
- Only one card can be expanded at a time
- 3D rotation effect on card content (`rotateX(-90deg)` → `rotateX(0deg)`)

**Contact Form:**
- Client-side validation with regex patterns for email and phone
- On submit: shows "Thank you" overlay, sends WhatsApp message via CallMeBot API
- Phone number normalization: converts `0...` to `+972...` format

**Typing Animation (About Me):**
- Cycles through words: ['hard', 'fun', 'passion', 'a journey', 'LIFE']
- Async/await pattern with custom `sleep()` function
- CSS class toggling for cursor animation state

**Hobbies Carousel:**
- Handles both images and videos
- Auto-pauses current video when navigating away
- Auto-plays video when navigating to it

## Local Development

This is a static site with no build process:

```bash
# Serve locally (using Python 3)
python3 -m http.server 8000

# Or using Node.js http-server
npx http-server

# Or using PHP
php -S localhost:8000
```

Open `http://localhost:8000` in browser.

No package.json, npm scripts, or build commands - just static files.

## External Dependencies

- **Boxicons**: `https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css` - Icons for hamburger menu
- **Academicons**: `https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css` - Academic/social icons (deferred loading)
- **CallMeBot API**: WhatsApp notification service for contact form submissions

## Common Tasks

**Adding a new page:**
1. Create HTML file in `pages/`
2. Create CSS directory under `css/` with at least `background.css`
3. Copy navbar/footer structure from existing pages
4. Update all navbars to include link to new page

**Modifying navbar or footer:**
- Must update ALL HTML files (no templating system)
- Navbar: `header.header > nav.navbar`
- Footer: `footer` with social link buttons

**Adding a new interactive feature:**
1. Create JS file in appropriate `js/` subdirectory
2. Use `DOMContentLoaded` event listener pattern
3. Load script at end of `<body>` in relevant HTML file(s)

**Fixing backdrop-filter issues:**
- If navbar/footer transparency problems occur, check `backdrop-filter` CSS
- Ensure `-webkit-backdrop-filter` is included for Safari
- May need `z-index` adjustments

## Known Issues & Considerations

- **Code duplication**: Navbar/footer markup repeated across all pages (7 files)
- **No component system**: Pure HTML/CSS/JS, no framework or build tools
- **API key exposure**: CallMeBot API key hardcoded in `js/form/form-submission.js` (commented "please do not steel")
- **Browser compatibility**: Relies on modern CSS (backdrop-filter, CSS Grid)
- **Mobile animations**: Footer links have intentional delay on mobile for animation visibility
