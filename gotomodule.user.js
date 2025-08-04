// ==UserScript==
// @name         Odoo Module List
// @namespace    http://tampermonkey.net/
// @version      2025-07-28
// @description  try to take over the world!
// @author       GreemDev
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==


(function() {
    'use strict';

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

    document.addEventListener('keydown', async function(e) {

        if (threeKeys(e, 's')) {
            openOdooModule(true);
            return;
        }

        if (twoKeys(e, 's')) {
            openOdooModule();
            return;
        }
    })

    const pattern = /https:\/\/[^/]+\/odoo\/?$/;

    if (!pattern.test(window.location.href)) {
        return;
    }

    const awaitModules = () => {

        const modules = Array.from(document.body.querySelectorAll('a'));

        const modulesData = modules.map(module => {


            const url = module.href;

            let name = module.lastChild.textContent;

            if (name === '') {
                name = 'Home'
            }

            return { name, url };
        })

        GM_setValue('odoo_modules', modulesData);
    };

    setTimeout(awaitModules, 1000);
})();