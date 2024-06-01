import React, {createContext, useState} from "react";
import {Toolbar} from "./Toolbar.js";
import {Modal} from "./modal/Modal.js";

import {TextDialogContent} from "./dialogs/TextDialogContent.js";

const AppContext = createContext();

const App = () => {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedValidators, setSelectedValidators] = useState([]);
    const [modalParams, setModalParams] = useState({
        title: '',
        content: null
    });

    // only set this function to control the modal
    const updateModalParams = params => {
        const visibility = !!params.title && (params.content !== null);
        setModalParams(params);
        setModalVisibility(visibility);
    };

    return (
        <AppContext.Provider value={[updateModalParams, selectedValidators, setSelectedValidators]}>
            <div id="tailor-mail-contact-form-toolbar">
                <Toolbar/>
                <Modal title={modalParams.title}
                       ContentComponent={modalParams.content}
                       visible={modalVisibility}
                       modalVisibilityHandle={setModalVisibility}
                />
            </div>
        </AppContext.Provider>
    );
};

export {
    App,
    AppContext
};