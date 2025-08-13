// ==UserScript==
// @name         Odoo Module List
// @namespace    http://tampermonkey.net/
// @version      2025-08-13
// @description  Open a Odoo module on any page!
// @author       DevGreem
// @match        *://*/*
// @iconURL      https://play-lh.googleusercontent.com/Zv2I5VIii0ZK9sJ2FgPFZxynVqtcenDZkO9BUYMO-35sTExs21OsGXEj2kQQFkk2ww
// @grant        GM_getValue
// @require      https://raw.githubusercontent.com/DevGreem/Odoo-UserScripts-TM/main/utils.js
// @require      https://raw.githubusercontent.com/DevGreem/Odoo-UserScripts-TM/main/loadModules.js
// ==/UserScript==

(function() {
    'use strict';

    console.log("Executing Module List");

    /**
     * 
     * @param {boolean} openInNewTab 
     * @returns 
     */
    async function openOdooModule(openInNewTab = false) {
        /** @type {{name: string, url: string}[]} */
        const modules = await GM_getValue('odoo_modules', []);
            
        console.log(modules);

        if (!modules || modules.length == 0) {
            alert('Modules not found');
            return;
        }

        const selection = prompt(
            "Select an Odoo module\n" +
            modules.map((module, index) => `${index + 1}. ${module.name}`).join('\n')
        );

        if (!selection || selection.trim() === '') {
            sendTo(modules[0].url, openInNewTab);
            return;
        }
            
        const index = parseInt(selection) - 1;
            
        if (isNaN(index)) {
            alert('You only can write numbers');
            return;
        }

        let actModule;

        try {
            actModule = modules[index];
        }
        catch {
            alert('Invalid selection');
        }
            
        if (actModule.url.endsWith('contacts')) {
            actModule.url += '?view_type=list';
        }

        sendTo(actModule.url, openInNewTab);
        return;
    }

    addShortcut(threeKeys, 's', (e) => openOdooModule());
    addShortcut(twoKeys, 's', (e) => openOdooModule(true));
})();