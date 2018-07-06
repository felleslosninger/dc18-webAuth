(function() {
    const $ = jQuery.noConflict();
    
    // getter for the localstorage referrer item
    const getReferrer = url => {
        const localStorageKey = "referrer:" + url;
        return window.localStorage.getItem(localStorageKey);
    };

    // helper function: convert relative paths (relative to current URL) to
    // absolute paths
    const absolutePath = relPath => {
        let baseParts = window.location.href.split("/");
        let relParts = relPath.split("/");
        
        baseParts.pop(); // remove current document (keep parent directories)
        
        relParts.forEach(p => {
            if (p === ".") return; // don't modify current folder
            
            if (p === "..")
                baseParts.pop();
            else 
                baseParts.push(p);
        });
        
        return baseParts.join("/");
    }

    // helper function: remove part of url following question mark, as this is
    // not identifying to the page
    const removeAfterQuestionMark = url => {
        return url.split("?")[0]; // hax
    }
    
    // current url (is absolute path)
    const currentUrl = removeAfterQuestionMark(window.location.href);
    
    // create onclick listener to create a referrer object in localstorage for
    // any referrer elements
    $(".referrer").on("click", function(event) {
        // referrer/referrees must use absolute paths because it's unambiguous
        const absReferreePath = removeAfterQuestionMark(absolutePath($(this).attr("href")));
        console.log("Referrer clicked" + localStorageItem);
        
        $(document).trigger("redirect:create-referrer", {
            referrer: currentUrl, // is absolute already
            referree: absReferreePath
        });
    });
    
    
    // set referree hrefs if there is a localStorageItem
    const localStorageItem = getReferrer(currentUrl);
    if (localStorageItem) {
        console.log("Local storage element found for referree: was " + localStorageItem);
        $(".referree").attr('href', localStorageItem).on("click", (event) => {
            console.log("Referree clicked");
            $(document).trigger('redirect:remove-referrer', currentUrl);
        });
    }
})();
