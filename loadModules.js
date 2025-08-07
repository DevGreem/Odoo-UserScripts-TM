
const pattern = /https:\/\/[^/]+\/odoo\/?$/;

if (!pattern.test(window.location.href)) {
    return;
}

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