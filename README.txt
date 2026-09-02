HAFÞÓR ÁRNI HERMANNSSON — SIMPLE EDITABLE PORTFOLIO
=====================================================

This version has no React, Vinext, ChatGPT authentication, database files,
package manager, build process or generated framework code.

It contains only:

    index.html       Text, project sections, image order and captions
    styles.css       Layout, colors, tile sizes and image cropping
    script.js        Fullscreen image viewer
    projects/        All project images, GIFs and the earthquake animation
    favicon.svg      Browser icon
    local-server.py  Tiny no-cache local web server
    start-local.bat  Windows launcher


RUNNING THE WEBSITE

1. Double-click start-local.bat.
2. The portfolio opens in your browser.
3. Leave the terminal window open.
4. Save any changes and refresh the browser tab.
5. Press Ctrl+C in the terminal to stop the server.


EDITING TEXT, CAPTIONS, PICTURES AND ORDER

Open index.html in a text editor such as Visual Studio Code.

To change the main heading, search for:

    <h1>I make<br>stuff.</h1>

Each gallery picture is an ordinary block like this:

    <button class="gallery-card wide" aria-label="Open Mechanical design">
      <img src="projects/startracker-cad-png.webp"
           alt="CAD model of the star tracker"
           loading="lazy">
      <span class="image-index">02.02</span>
      <span class="image-caption">Mechanical design</span>
    </button>

Change the filename after src= to replace the image. Put new image files in
the projects folder. Move the entire button block to reorder a picture, or
delete the block to remove it.

GIF animations use the same <img> blocks as ordinary pictures. They animate
automatically and open in the fullscreen viewer when clicked.

Available tile classes are:

    gallery-card standard
    gallery-card wide
    gallery-card tall
    gallery-card feature


EDITING THE LAYOUT OR CROPPING

Open styles.css.

The main gallery layout is under .project-grid.
Tile sizes are under .gallery-card, .wide, .tall and .feature.
The desktop chapter width is controlled by max-width: 1100px.
Image cropping is controlled by:

    .gallery-card img, .gallery-card video {
      object-fit: cover;
    }

"cover" fills a tile and crops its edges. "contain" shows the whole picture.


HOSTING ONLINE

Upload the contents of this folder to the root of any static web host.
