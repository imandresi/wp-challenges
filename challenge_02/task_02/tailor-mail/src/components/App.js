import React from "react";
import {Toolbar} from "./Toolbar.js";
import {Modal} from "./modal/Modal.js";

import {TextDialogContent} from "./dialogs/TextDialogContent.js";


const App = () => {
    return (
        <div id="tailor-mail-contact-form-toolbar">
            <Toolbar/>
            <Modal title={"Title of the Dialog: Number"}
                   ContentComponent={TextDialogContent}
            />
        </div>
    );
};

export {
    App
};