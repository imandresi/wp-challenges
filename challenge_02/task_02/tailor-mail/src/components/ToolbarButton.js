import React, {useContext} from "react";
import {ModalContext} from "./App.js";
import {TextDialogContent} from "./dialogs/TextDialogContent.js";

function ToolbarButton({label, dialogTitle, dialogContent}) {
    const [updateModalParams] = useContext(ModalContext);
    const title = dialogTitle ?? `Form Field Wizard : ${label.toUpperCase()}`;
    return (
        <div className="tailor-mail__toolbar__button">
            <button type="button"
                    className="button"
                    onClick={() => {
                        updateModalParams({
                            title: title,
                            content: dialogContent
                        });
                    }}
            >{label}</button>
        </div>
    );
}

export {
    ToolbarButton
}