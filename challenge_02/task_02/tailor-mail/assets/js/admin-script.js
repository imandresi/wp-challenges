(function () {
    let formTextareaEl;
    let formControlNamesAreaEl;

    function process(content) {
        const regexp = /\[(text|textarea)\s.*?name="(.+?)".*?]/gs;
        const names = [...content.matchAll(regexp)].map(match => {
            const name = match[2];
            return `[${name}]`;
        });

        formControlNamesAreaEl.innerText = names.join(', ');
    }

    function init() {
        formTextareaEl.addEventListener('change', e => {
           process(formTextareaEl.value);
        });

        formTextareaEl.addEventListener('keypress', e => {
           process(formTextareaEl.value);
        });

        process(formTextareaEl.value);
    }

    addEventListener('DOMContentLoaded', () => {
        formTextareaEl = document.querySelector('#tailor-mail-metabox-form textarea.tailor-mail__form-builder');
        formControlNamesAreaEl = document.querySelector('#tailor-mail__meta-box__mail #form-control-names-area');

        if (formTextareaEl && formControlNamesAreaEl) {
            init();
        }
    });

})();