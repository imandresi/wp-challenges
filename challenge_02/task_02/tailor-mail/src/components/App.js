import React, {createContext, useState} from "react";
import {Toolbar} from "./Toolbar.js";
import {Modal} from "./modal/Modal.js";

import {TextDialogContent} from "./dialogs/TextDialogContent.js";

const ModalContext = createContext();

const App = () => {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalParams, setModalParams] = useState({
        title: '',
        content: null
    })

    // only set this function to control the modal
    const updateModalParams = params => {
        const visibility = !!params.title && (params.content !== null);
        setModalParams(params);
        setModalVisibility(visibility);
    };

    return (
        <ModalContext.Provider value={[updateModalParams]}>
            <div id="tailor-mail-contact-form-toolbar">
                <Toolbar/>
                <Modal title={modalParams.title}
                       ContentComponent={modalParams.content}
                       visible={modalVisibility}
                       modalVisibilityHandle={setModalVisibility}
                />
            </div>
        </ModalContext.Provider>
    );
};

export {
    App,
    ModalContext
};