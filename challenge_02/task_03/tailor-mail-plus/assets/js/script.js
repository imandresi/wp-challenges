(function () {


    function init() {
        const inputControls = document.querySelectorAll('.tailor-mail-input-control');
        if (!inputControls) return;

        inputControls.forEach(controlEl => {
            const containerEl = controlEl.closest('.tailor-mail-form-container');
            const containerElID = containerEl && containerEl.id;
            if (!containerElID) return;

            controlEl.addEventListener('keydown', e => {
                const elName = controlEl.name;
                const errorAreaSelector = `#${containerElID} .tailor_mail_error.${elName}`;
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