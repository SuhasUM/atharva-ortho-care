# Website update — 3 October 2026

## Final photo arrangement

- Home automatically rotates through all three original doctor photos and the two selected new photos, every five seconds. Photos fill the slideshow frame, with no visible slideshow controls. Reduced-motion preferences pause autoplay by default.
- About Doctor uses the original white-coat portrait (`IMG_0210.JPG.jpeg`). Images scale proportionally and stay within their frames.
- The doctor gallery includes all three original photos and all six newly uploaded doctor photos.
- All five uploaded award/certificate photos are included. The existing `gallery/clinic-photo-6.jpg` remains in the recognition collection. Alternate views of the same awards are labeled accordingly.
- Separate awards, fellowship/certificates, and doctor collections include full-image viewing, original-image links, Escape support, and focus restoration. Certificate descriptions reflect identifiable content without guessing the Kannada recognition title.

## Layout and content

- Header and footer use the same navy background on desktop and mobile, with readable text contrast.
- Desktop navigation uses balanced spacing with Call Now and Book Appointment actions; smaller widths use the collapsible menu. Specialty lists display one bullet per item.
- Added Baines International Healthcare, J.P Nagar last in the visiting consultant list.
- Preserved the Manrope and Cormorant Garamond typefaces and existing text styling.
- Fixed photo framing, internal scrolling in decorative cards, review star sizing, contact-card spacing, form sizing, and mobile bottom-bar clearance.
- Saved existing Tailwind utility styles locally in `utilities.css`; page layout no longer requires the Tailwind CDN JavaScript to run. Google Fonts and external maps/videos still require internet access.

## Validation

- JavaScript syntax, all eight generated page templates, and local asset references passed.
- All eight pages checked at small phone, standard phone, and tablet sizes. No horizontal page overflow or clipped text/form controls found in the final 320px and 768px sweeps.
- Desktop header checked at 1024, 1279, 1280, 1366, 1440, and 1920 pixels, including link and brand overlap checks.
- Verified automatic slideshow advancement, removal of slideshow controls, menu open/close and Escape, photo viewer and close, original images, and required appointment-form validation.
- No appointment was submitted and no live deployment was performed.

## Uploading the update

Upload the complete website folder, including `utilities.css`, `media-gallery.js`, updated HTML files, `app.js`, `styles.css`, original photos, and added media. Each main HTML page loads `styles.css` followed by `utilities.css`, and `media-gallery.js` before `app.js`. No package installation or build command is required.

When adding new utility classes in future, include their CSS in `utilities.css` or use explicit component styles in `styles.css`; the local stylesheet does not generate classes at runtime.

