HAFÞÓR ÁRNI HERMANNSSON - EDITABLE PORTFOLIO
==============================================

This is a simple static website. It does not need React, a database or a package
manager. The site contains:

    index.html       Page text, section order, image order and captions
    styles.css       Visual design, responsive layout and image sizing
    script.js        Automatic numbering and the fullscreen media viewer
    projects/        Project photographs, GIFs and video
    Hafthor-Arni-Hermannsson-CV.pdf
    favicon.svg


RUNNING THE WEBSITE
-------------------

1. Double-click start-local.bat on Windows.
2. The portfolio opens in your browser.
3. Leave the terminal window open while viewing the site.
4. Save changes and refresh the browser.
5. Press Ctrl+C in the terminal to stop the server.


PAGE ORGANIZATION
-----------------

The work is grouped by what each project demonstrates:

    01  Professional hardware
    02  Wave-energy thesis
    03  Celestial machines
    04  Motion + interfaces
    05  Robots + wireless
    06  Machines + tools
    07  Physical experiments

Each section begins with a short case-study summary and four facts. Related
photos are then arranged in one or more labeled gallery groups. The old "More
from the bench" section was removed; its items now sit in the relevant sections.


EDITING TEXT, CAPTIONS, IMAGES AND ORDER
----------------------------------------

Open index.html in a text editor such as Visual Studio Code.

Each gallery item is an ordinary button containing an image, for example:

    <button class="gallery-card wide"
            data-kind="CAD"
            data-detail="Optional extra text shown in the fullscreen viewer."
            aria-label="Open mechanical design">
      <img src="projects/startracker-cad-png.webp"
           alt="CAD model of the star-tracking mount"
           loading="lazy">
      <span class="image-index"></span>
      <span class="image-caption">Mechanical design</span>
    </button>

Change the filename after src= to replace an image. Put new image files in the
projects folder. Move the whole button to reorder it or delete the button to
remove it. Numbering and each section's media count are updated automatically.

The data-kind label is the small colored label at the top right of the image.
The data-detail text is shown only in the fullscreen viewer. If it is omitted,
the image's alt text is used as the description.


EDITING THE GRID
----------------

Available tile classes are:

    gallery-card             small landscape tile
    gallery-card wide        wide landscape tile
    gallery-card tall        portrait tile
    gallery-card feature     large featured tile
    gallery-card full        full-width tile

The grid uses dense placement, so cards fill the earliest available space and
leave fewer empty gaps. The desktop gallery width is controlled by this variable
near the top of styles.css:

    --gallery: 960px;

Reduce that number to tighten the viewing area. Image cropping is controlled by:

    .gallery-card img,
    .gallery-card video {
      object-fit: cover;
    }

"cover" fills a tile and crops its edges. "contain" shows the full media but may
leave blank space around it.


HOSTING ONLINE
--------------

Upload the contents of this folder to the root of any static web host. The site
also works with GitHub Pages.
