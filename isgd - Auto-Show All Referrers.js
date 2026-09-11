// ==UserScript==
// @name         is.gd - Auto-Show All Referrers
// @author       PixelSpark987 - https://is.gd/PS987
// @description  Automatically clicks "Show more referrers" links on is.gd stats pages
// @namespace    http://tampermonkey.net/
// @version      1.1
// @downloadURL  https://raw.githubusercontent.com/PixelSpark987/isgd-show-all-referrers/refs/heads/main/isgd%20-%20Auto-Show%20All%20Referrers.js
// @updateURL    https://raw.githubusercontent.com/PixelSpark987/isgd-show-all-referrers/refs/heads/main/isgd%20-%20Auto-Show%20All%20Referrers.js
// @match        https://is.gd/stats.php*
// @match        https://v.gd/stats.php*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function clickShowMore() {
        // Find all links that start with the correct query parameter
        const links = document.querySelectorAll('a[href^="stats.php?allref=1"]');

        links.forEach(link => {
            // Verify it's the correct button by checking the text inside it
            if (link.textContent.trim() === "Show more referrers") {
                link.click();
                console.log('Automatically expanded referrers list.');
            }
        });
    }

    // Run once immediately when the page structure is ready
    clickShowMore();

    // Use a MutationObserver in case the stats table loads in lazily
    const observer = new MutationObserver(() => {
        clickShowMore();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
