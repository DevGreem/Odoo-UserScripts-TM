// ==UserScript==
// @name         Odoo Module List
// @namespace    http://tampermonkey.net/
// @version      2025-08-07
// @description  Open a Odoo module on any page!
// @author       GreemDev
// @match        *://*/odoo
// @match        *://*.odoo
// @iconURL      https://play-lh.googleusercontent.com/Zv2I5VIii0ZK9sJ2FgPFZxynVqtcenDZkO9BUYMO-35sTExs21OsGXEj2kQQFkk2ww
// @grant        GM_setValue
// @require      https://raw.githubusercontent.com/DevGreem/Odoo-UserScripts-TM/main/utils.js
// ==/UserScript==

(function() {
    console.log("Saving modules...")

    document.addEventListener('DOMContentLoaded', (e) => {
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
    })
})()