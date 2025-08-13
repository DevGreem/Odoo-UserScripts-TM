// ==UserScript==
// @name         Neutralize Ribbon Remover
// @namespace    http://tampermonkey.net/
// @version      2025-08-13
// @description  Removes the neutralize banner!
// @author       DevGreem
// @match        *://*.odoo/*
// @match        *://*/odoo/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=odoo.com
// @grant        none
// ==/UserScript==

(function() {

    const neutralizeRibbon = document.getElementById('oe_neutralize_ribbon');

    !neutralizeRibbon && neutralizeRibbon.remove();
})();