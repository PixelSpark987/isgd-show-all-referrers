// ==UserScript==
// @name         is.gd - Auto-Show All Referrers
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically clicks "Show more referrers" links on is.gd stats pages
// @author       PixelSpark987
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