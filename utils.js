// ==UserScript==
// @name         Odoo Module List
// @namespace    http://tampermonkey.net/
// @version      2025-08-05
// @description  Odoo UserScripts Utils!
// @author       GreemDev
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    "use strict";

    /**
     * Open a link
     * @param {string} url
     * @param {boolean} inNewTab
     */
    function sendTo(url, inNewTab = false) {
        if (inNewTab) {
            window.open(url, '_blank');
            return;
        }
        window.location.href = url;
    }

    /**
     * 
     * @param {KeyboardEvent} key
     * @param {string} awaitedKey
     */
    function twoKeys(key, awaitedKey) {
        return key.ctrlKey && key.altKey && key.key.toLowerCase() === awaitedKey;
    }

    /**
     * 
     * @param {KeyboardEvent} key 
     * @param {string} awaitedKey
     */
    function threeKeys(key, awaitedKey) {
        return key.shiftKey && twoKeys(key, awaitedKey)
    }

    /**
     * @param {twoKeys|threeKeys} shortcutFunction
     * @param {string} awaitedKey 
     * @param {(e: KeyboardEvent) => void} toExecute 
     */
    function addShortcut(shortcutFunction, awaitedKey, toExecute) {
        
        document.addEventListener('keydown', (e) => {
            
            if (shortcutFunction(e, awaitedKey)) {
                toExecute(e)
            }
        })
    }
    
})()