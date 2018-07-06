(function() {
    const $ = jQuery.noConflict();
    
    // getter for the localstorage referrer item
    const getReferrer = url => {
        const localStorageKey = "referrer:" + url;
        return localStorage.getItem(localStorageKey);
    };

    // helper function: convert relative paths (relative to current URL) to
    // absolute paths
    const absolutePath = relPath => {
        let baseParts = window.location.href.split("/");
        let relParts = relpath.split("/");
        
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
    
    // current url (is absolute path)
    const currentUrl = window.location.href;
    
    // create onclick listener to create a referrer object in localstorage for
    // any referrer elements
    $(".referrer").on("click", function(event) {
        // referrer/referrees must use absolute paths because it's unambiguous
        const absReferreePath = absolutePath($(this).attr("href"));
        
        $(document).trigger("redirect:create-referrer", {
            referrer: currentUrl, // is absolute already
            referree: absReferreePath
        });
    });
    
    
    // set referree hrefs if there is a localStorageItem
    const localStorageItem = getReferrer(url);
    if (localStorageItem) {
        $(".referree").attr('href', localStorageItem).on("click", (event) => {
            $(document).trigger('redirect:remove-referrer', currentUrl);
        });
    }
})();
