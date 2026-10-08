# Week 4 – Performance & Accessibility Optimization

## Project
Rudra – Performance and Accessibility Optimized Portfolio

## Objective
The purpose of this task was to improve the existing interactive portfolio by optimizing its HTML structure, CSS, JavaScript, image loading behavior and accessibility.

## Main Improvements

### 1. Semantic HTML
The portfolio now uses semantic `header`, `nav`, `main`, `section`, `article`, `address` and `footer` elements. Each major section has a descriptive heading.

### 2. Image Performance
Images below the initial hero area use `loading="lazy"` and `decoding="async"`. Explicit `width` and `height` values reduce layout shifts. The hero image uses `fetchpriority="high"` because it is visible immediately.

### 3. Accessibility
A skip-to-content link was added for keyboard users. Navigation has an accessible label, the mobile menu exposes `aria-expanded` and `aria-controls`, project filters use `aria-pressed`, and the project modal uses dialog-related ARIA attributes.

All meaningful images have descriptive alt text. Decorative skill icons are hidden from assistive technology with `aria-hidden="true"`.

### 4. Keyboard Navigation
Interactive elements are native buttons and links. Visible `:focus-visible` styles make keyboard focus easy to identify. The modal can be closed with Escape and returns focus to the button that opened it. A basic focus trap is included while the modal is open.

### 5. Form Accessibility
Every form control has a visible label. Validation updates `aria-invalid` and provides error text through live regions. The first invalid field receives focus after an unsuccessful submission.

### 6. Responsive Design
The existing responsive portfolio concept was preserved. The navigation changes to a mobile menu, cards collapse to fewer columns, and the content remains usable on small screens.

### 7. Reduced Motion
A `prefers-reduced-motion: reduce` media query disables decorative animation and smooth scrolling for users who request less motion.

### 8. JavaScript and Performance
The JavaScript file is loaded with `defer`. Scroll-based functionality uses passive scrolling and IntersectionObserver where appropriate. DOM references are cached instead of repeatedly querying the same elements.

## Testing Plan

The final website should be tested with:

- Chrome Lighthouse – Performance and Accessibility
- WAVE – accessibility issues
- axe DevTools – WCAG-related checks
- Browser Developer Tools – responsive layouts and console errors
- Keyboard-only testing – Tab, Shift+Tab, Enter, Space and Escape

Do not report numerical Lighthouse, WAVE or axe scores until the final local version has actually been tested.

## Files

- `index.html` – optimized semantic and accessible webpage
- `style.css` – responsive, accessibility-focused styling
- `script.js` – optimized interactive functionality
- `profile.png`, `about.png`, `image1.png`, `image2.png`, `image3.jpg` – existing portfolio images

## Conclusion
The Week 3 interactive portfolio has been upgraded for the Week 4 performance and accessibility task. The new version keeps the existing portfolio content and JavaScript functionality while improving semantic structure, keyboard accessibility, ARIA support, image loading, responsive behavior, reduced-motion support and efficient browser-side code.
