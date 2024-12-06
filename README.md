# YouTube Bookmarker Chrome Extension

The **YouTube Bookmarker** Chrome Extension allows users to save timestamps and notes on YouTube videos, providing an efficient way to mark and revisit important moments. This extension is useful for students, professionals, and anyone who wants to keep track of key moments in YouTube videos.

## Features
- **Bookmark YouTube videos:** Save timestamps along with descriptions of key moments.
- **Play bookmarked timestamps:** Quickly jump to any saved bookmark.
- **Delete bookmarks:** Remove bookmarks that are no longer needed.
- **Sync across devices:** Store bookmarks in Chrome's synced storage, accessible from any device where the extension is installed.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kdjayyyy/youtube-bookmarker.git
   ```
2. Open Chrome, go to ```chrome://extensions/``` in the address bar.

3. Enable Developer mode by toggling the switch at the top-right.

4. Click **Load unpacked** and select the folder where you cloned the repository.

5. The extension will now be available in your Chrome browser.

## Usage

1. Navigate to a YouTube video.

2. Click on the bookmark icon in the video controls to save the current timestamp with a description.

3. To view your saved bookmarks, click the extension icon in the browser toolbar.

4. Click on any bookmark to instantly jump to that timestamp in the video.

5. You can also delete bookmarks that are no longer needed from the extension interface.

## How it Works

The extension works by interacting with YouTube's video player through a content script. Bookmarks are stored in Chrome's sync storage and are associated with the current video. The extension supports basic operations:

   - **Bookmarking**: Clicking the bookmark icon saves the current timestamp and allows users to add descriptions.

   - **Bookmark Viewing**: Users can view, play, and delete bookmarks directly from the extension's popup.

   - **Data Sync**: All bookmarks are stored in the cloud via Chrome Sync, so they persist across devices.

## Development

To contribute or modify the extension:

   1. Clone the repo.
   
   2. Modify the code as needed.

   3. Test locally by loading the unpacked extension into Chrome.

   4. Submit a pull request with your changes.

## Files Overview

   - **background.js**: Handles the background processes, including listening for messages and syncing data.

   - **contentScript.js**: Interacts with the YouTube video player to track timestamps and manage bookmark data.

   - **popup.js**: Manages the user interface for viewing and interacting with bookmarks.

   - **popup.html**: HTML structure for the popup.

   - **popup.css**: Styles for the popup.

## Acknowledgements

   - This extension uses the **Chrome Extension API** for storage and messaging.

   - Thanks to YouTube for providing a powerful platform for video sharing and learning.
