import React from "react";
import "./modal.scss";

function Modal({title, ContentComponent}) {
    return (
        <div className="tailor-mail__modal__overlay">
            <section className="tailor-mail__modal">
                <header>{title}</header>
                <section className="tailor-mail__modal__content"><ContentComponent/></section>
                <footer>
                    <textarea
                        readOnly={true}>[text label="Subject of your message" name="subject" validator="required"]</textarea>
                    <button className="button">Insert</button>
                </footer>
            </section>
        </div>
    );
}

export {
    Modal
}