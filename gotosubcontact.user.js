// ==UserScript==
// @name         Odoo Subcontacts List
// @namespace    http://tampermonkey.net/
// @version      2025-08-13
// @description  Instant open subcontacts of a contact!
// @author       DevGreem
// @match        *://*/odoo/res.partner/*
// @include      *://*.odoo/res.partner/*
// @include      *://*/odoo/contacts/*
// @include      *://*.odoo/contacts/*
// @icon         https://play-lh.googleusercontent.com/Zv2I5VIii0ZK9sJ2FgPFZxynVqtcenDZkO9BUYMO-35sTExs21OsGXEj2kQQFkk2ww
// @grant        none
// @require      https://raw.githubusercontent.com/DevGreem/Odoo-UserScripts-TM/main/utils.js
// ==/UserScript==

(function() {
    'use strict';

    console.log("Executing Subcontacts List");

    /**
     * @type {{name: string, url: string}[]}
     */
    const subcontactsPannel = [];

    function loadSubcontacts() {
        const subcontacts = Array.from(document.getElementsByTagName('article'));

        subcontacts.forEach((subcontact, index) => {
            //console.log(`loading subcontact ${index}`)

            /**
             * @type {HTMLImageElement}
             */
            const portrait = subcontact.getElementsByTagName('img').item(0);
            //console.log('loaded image', portrait);

            /**
             * @type {HTMLDivElement}
             */
            const nameDiv = subcontact.getElementsByTagName('main').item(0).getElementsByTagName('div').item(0);
            let name;

            if (nameDiv.getAttribute('name')) {
                /**
                 * @type {HTMLSpanElement}
                 */
                const nameSpan = nameDiv.getElementsByTagName('span').item(0);

                name = nameSpan.textContent;
            }
            //console.log('loaded name', nameDiv)

            const pattern = /res.partner\/(\d+)/;

            const subcontactId = pattern.exec(portrait.src);
            //console.log('subcontactId loaded', subcontactId)

            const splittedUrl = window.location.href.split('/');

            splittedUrl[splittedUrl.length - 1] = subcontactId[1];
            //console.log(subcontactId[1])
            //console.log(splittedUrl);

            const joinedUrl = splittedUrl.join('/');
            //console.log("Final URL:", joinedUrl)

            subcontactsPannel.push({ name: name, url: joinedUrl});
            //console.log('saved subcontact')
        });

        //console.log(subcontacts)
        //console.log(subcontactsPannel)
    };

    setInterval(loadSubcontacts, 2000);
    
    function goToContact(inNewTab = false) {
        if (subcontactsPannel.length == 0 || !subcontactsPannel) {
            alert('No subcontacts');
            return;
        }

        const selection = prompt(
            'Select a subcontact: \n\n' +
            subcontactsPannel.map((subcontact, index) => `${index+1}. ${subcontact.name}\n`)
        )

        if (!selection) {
            return;
        }

        const selectedSubContact = parseInt(selection)-1;

        sendTo(subcontactsPannel[selectedSubContact].url, inNewTab);
    }

    addShortcut(twoKeys, 'g', (e) => goToContact(true));
    addShortcut(threeKeys, 'g', (e) => goToContact());
})();