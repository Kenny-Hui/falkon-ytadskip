(function() {
    'use strict';

    if(window.location.hostname !== "www.youtube.com") {
        return;
    }

    let ytObserver;

    function skipToTimestamp(videoElem, timestamp) {
        if(isFinite(timestamp)) {
            videoElem.currentTime = timestamp;
        }
    }

    function callback(mutationList, observer) {
        const isAdPlaying = document.querySelector(".ad-showing") != null;
        if(!isAdPlaying) return;

        // Click the skip button directly if exist (Does not exist on non-skippable ads)
        const skipBtn = document.querySelector(".ytp-ad-skip-button");
        const closeBtn = document.querySelector("ytp-ad-overlay-close-button")
        if(skipBtn != null) skipBtn.click();

        // Skip the video to the end in-case it isn't skippable
        const videoElem = document.querySelector(".html5-main-video");
        videoElem.play();
        skipToTimestamp(videoElem, videoElem.duration);
    }

    function onLoad() {
        if(ytObserver != null) ytObserver.disconnect();
        const playerElement = document.querySelector(".html5-video-player")
        if(playerElement == null) return;
        ytObserver = new MutationObserver(callback);
        ytObserver.observe(playerElement, { attributes: false, childList: true, subtree: true });
    }

    // Called by YouTube when a new yt page has finished loaded. (e.g. Navigating within YouTube doesn't reload the actual page)
    document.body.addEventListener("yt-navigate-finish", onLoad);

    // Called first to speed up ad skipping on first page load.
    onLoad();
})();
