// check if the current page is a youtube page or not
// retrieve all stored bookmarks from chrome storage 

export async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true
  });

  return tabs[0];
}
