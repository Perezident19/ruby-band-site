# Site Images for George

1. Open the existing Ruby Google Sheet.
2. Add a tab named exactly Site Images.
3. Paste site-images-template.tsv into A1. If it lands in one column, use
   Data > Split text to columns and choose Tab.
   Alternatively import the file using Insert new sheet(s) and rename that tab.
4. Keep the header row and image_id values unchanged.

page and section identify the photo. Edit image_url to replace it.
Current assets/ links already work; there is no need to upload existing photos.
New photos can use a direct HTTPS image link or a Google Drive FILE link.
Set each Drive photo to Anyone with the link / Viewer.
Do not use a folder link, IMAGE formula, or linked display text.

crop_position is optional. Blank keeps the site's original crop.
Use center, center top, or a two-percentage value such as 50% 35%.
The first percentage adjusts horizontally; the second adjusts vertically.
For a landscape image in a shorter box, a higher vertical percentage moves
the crop window down the source photo. No stretching or zoom changes are added.
alt_text is a short description for accessibility.

The site-logo row changes the header logo on every page.
Deleting a row or clearing its image_url restores the built-in image on reload.
Invalid links or images that cannot load leave the built-in image visible.
Refresh after saving; Google may take a little time to serve edits.
Only photos change: layout, colors, type, and box dimensions remain unchanged.

Member photos: continue using Members.
Release cover art: continue using Music Release.
Videos are unchanged and are not managed by Site Images.

Deploy the site code once. Future sheet photo edits require no redeployment.
