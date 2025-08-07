console.log("Executing Utils");

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
 * @param {Document} toUpdateDocument
 * @param {twoKeys|threeKeys} shortcutFunction
 * @param {string} awaitedKey 
 * @param {(e: KeyboardEvent) => void} toExecute 
 */
function addShortcut(toUpdateDocument, shortcutFunction, awaitedKey, toExecute) {
    
    toUpdateDocument.addEventListener('keydown', (e) => {
        
        if (shortcutFunction(e, awaitedKey)) {
            toExecute(e)
        }
    })
}