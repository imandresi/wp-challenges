import React, {useContext, useEffect, useState} from "react";
import "./modal.scss";
import {buildPseudoCode, typeInTextarea} from "../../lib/helper.js";
import {AppContext} from "../App.js";

function Modal({title, ContentComponent, modalVisibilityHandle, visible}) {

    const [modalVisibility, setModalVisibility] = useState(visible);
    const [modalFooter, setModalFooter] = useState('');
    const [, , setSelectedValidators] = useContext(AppContext);

    const updateModalVisibility = v => {
        setModalVisibility(v);
        if (typeof modalVisibilityHandle === 'function') {
            modalVisibilityHandle(v);
        }
    };

    const closeModal = () => {
        setSelectedValidators([]);
        updateModalVisibility(false);
    }

    const updatePseudoCode = (name, pseudoCodeAttributes, value) => {
        const a = {...pseudoCodeAttributes};
        pseudoCodeAttributes.current = {...pseudoCodeAttributes.current, ...value};

        const pseudoCode = buildPseudoCode(name, pseudoCodeAttributes.current);
        setModalFooter(pseudoCode);
    }

    useEffect(() => {
        setModalVisibility(visible);
    });

    return (
        <>
            {modalVisibility ?
                <div className="tailor-mail-plus__modal__overlay"
                     onClick={e => {
                         if (e.target.className === 'tailor-mail-plus__modal__overlay') {
                             closeModal();
                         }
                     }}
                >
                    <section className="tailor-mail-plus__modal">
                        <header>
                            <div>{title}</div>
                            <div className="tailor-mail-plus__close__btn"
                                 onClick={() => {
                                     closeModal();
                                 }}
                            ></div>
                        </header>
                        <section className="tailor-mail-plus__modal__content">
                            <ContentComponent
                                updatePseudoCode={updatePseudoCode}
                            />
                        </section>
                        <footer>
                            <div className="tailor-mail-plus__pseudocode">
                                {modalFooter}
                            </div>
                            <button type="button"
                                    className="button"
                                    onClick={() => {
                                        const textareaEl = document.querySelector('.tailor-mail-plus__form-builder');
                                        if (!textareaEl) return;

                                        textareaEl.focus();
                                        typeInTextarea(modalFooter, textareaEl);
                                        closeModal();
                                    }}
                            >Insert
                            </button>
                        </footer>
                    </section>
                </div>
                : null}
        </>
    );
}

export {
    Modal
}