(function () {


    function init() {
        const inputControls = document.querySelectorAll('.tailor-mail-plus-input-control');
        if (!inputControls) return;

        inputControls.forEach(controlEl => {
            const containerEl = controlEl.closest('.tailor-mail-plus-form-container');
            const containerElID = containerEl && containerEl.id;
            if (!containerElID) return;

            controlEl.addEventListener('keydown', e => {
                const elName = controlEl.name;
                const errorAreaSelector = `#${containerElID} .tailor_mail_plus_error.${elName}`;
                const errorAreaEl = document.querySelector(errorAreaSelector);
                if (errorAreaEl) {
                    errorAreaEl.innerText = '';
                }
            });
        });
    }

    addEventListener('DOMContentLoaded', () => {
        init();
    });

})();