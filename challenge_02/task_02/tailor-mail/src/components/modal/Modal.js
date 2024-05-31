import React, {useEffect, useState} from "react";
import "./modal.scss";

function Modal({title, ContentComponent, modalVisibilityHandle, visible}) {

    const [modalVisibility, setModalVisibility] = useState(visible);

    const updateModalVisibility = v => {
        setModalVisibility(v);
        if (typeof modalVisibilityHandle === 'function') {
            modalVisibilityHandle(v);
        }
    };

    useEffect(() => {
        setModalVisibility(visible);
    });

    return (
        <>
            {modalVisibility ?
                <div className="tailor-mail__modal__overlay"
                     onClick={e => {
                         if (e.target.className === 'tailor-mail__modal__overlay') {
                             updateModalVisibility(false);
                         }
                     }}
                >
                    <section className="tailor-mail__modal">
                        <header>
                            <div>{title}</div>
                            <div className="tailor-mail__close__btn"
                                 onClick={() => {
                                     updateModalVisibility(false);
                                 }}
                            ></div>
                        </header>
                        <section className="tailor-mail__modal__content"><ContentComponent/></section>
                        <footer>
                    <textarea
                        readOnly={true}>[text label="Subject of your message" name="subject" validator="required"]</textarea>
                            <button className="button">Insert</button>
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