# Music Updates for George

One-time setup:

1. Open the same Google Sheet used for Members and Shows.
2. Select the existing Music Release tab (gid 569666326).
3. Choose File > Import > Upload, and select music-template.tsv.
4. Choose Replace current sheet, not Replace spreadsheet. Use Tab as the separator.
5. Keep the first row unchanged. The three current songs are already included.

To add a song, add a row below the existing songs:

- active: yes to show; no to hide.
- sort_order: smaller numbers appear first. Use 0 for a new song to put it first.
- label: Single, Album, or Newest single.
- title: song or album name.
- description: optional short description.
- cover_art_url: paste a public Google Drive file link or direct HTTPS image link.
- primary_button_label: e.g. Listen on Spotify. Blank defaults to Listen.
- primary_url: streaming or Linktree URL. Blank means no button.
- secondary_button_label: optional label for another link.
- secondary_url: optional second streaming link. Blank means no button.
- featured_on_home: yes to include in the homepage spotlight; no for music page only.

The Original Music page shows every active song. The homepage shows the first
three active songs not marked no under featured_on_home, in sort_order order.

For Drive cover art, share the individual image as Anyone with the link / Viewer.
Existing assets/ paths in the starter rows already work; leave them unchanged.
Use plain pasted URLs, not linked display text or IMAGE formulas.

After saving a row, reload the website. Google may take a little time to serve
the updated sheet. No code change or redeployment is needed for future rows.
The initial website code update does need to be deployed once.

If the Music Release tab cannot load or is blank, existing static songs remain visible.
To hide every song, set active to no for each populated row.
The website reads this tab by its ID, so renaming it does not break the connection.
