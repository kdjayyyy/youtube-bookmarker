// adding a new bookmark row to the popup

import { getActiveTabURL } from "./utils";

// adding a new bookmark row to the popup
const addNewBookmark = (bookmarks, bookmark) => {
  const bookmarkTitleElement = document.createElement("div");
  const controlsElement = document.createElement("div");
  const newBookmarkElement = document.createElement("div");

  bookmarkTitleElement.textContent = bookmark.desc;
  bookmarkTitleElement.className = "bookmark-title";
  controlsElement.className = "bookmark-controls";

  setBookmarkAttributes("play", onPlay, controlsElement);
  setBookmarkAttributes("delete", onDelete, controlsElement);

  newBookmarkElement.id = `bookmark-${bookmark.time}`;
  newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute("timestamp", bookmark.time);

  newBookmarkElement.appendChild(bookmarkTitleElement);
  newBookmarkElement.appendChild(controlsElement);
  bookmarks.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks = []) => {
  const bookmarkElement = document.getElementById("bookmarks");
  bookmarkElement.innerHTML = "";

  if (currentBookmarks.length > 0) {
    for (let i = 0; i < currentBookmarks.length; i++) {
      const bookmark = currentBookmarks[i];
      addNewBookmark(bookmarkElement, bookmark);
    }
  } else {
    bookmarkElement.innerHTML = '<i class="row">No bookmarks to show</i>';
  }

  return;
};

const onPlay = async (e) => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};

const onDelete = async (e) => {
  const activeTab = await getActiveTabURL();
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const bookmarkElementToDelete = document.getElementById(
    `bookmark-${bookmarkTime}`
  );

  bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

  chrome.tabs.sendMessage(
    activeTab.id,
    {
      type: "DELETE",
      value: bookmarkTime,
    },
    viewBookmarks
  );
};

const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
  const controlElement = document.getElementById("img");

  controlElement.sec = `assets/${src}.png`;
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  controlParentElement.appendChild(controlElement);
};

// this event is a native window event that fires up when an HTML document has initially been loaded
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  if (!activeTab || !activeTab.url) {
    console.error("No active tab or URL found.");
    return;
  }

  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);
  const currentVideo = urlParameters.get("v");

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];

      // viewBookmarks functionality
      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    // if the page is not a youtube page
    // const container = document.getElementsByClassName('container')[0];
    const container = document.getElementsByClassName("container")[0];
    if (container) {
      container.innerHTML =
        '<div class="title">This is not a youtube video page</div>';
    } else {
      console.log("Container element not found!");
    }
  }
});
