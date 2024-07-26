import React from "react";
import {ToolbarButton} from "../ToolBarButton/ToolbarButton.js";
import {TextDialogContent} from "../dialogs/TextDialogContent.js";
import {TextareaDialogContent} from "../dialogs/TextareaDialogContent.js";
import {ButtonDialogContent} from "../dialogs/ButtonDialogContent.js";
import {SubmitDialogContent} from "../dialogs/SubmitDialogContent.js";

function Toolbar() {
    return (
        <div className="tailor-mail-plus__toolbar">
            <ToolbarButton label="Text"
                           dialogContent={TextDialogContent}/>

            <ToolbarButton label="Textarea"
                           dialogContent={TextareaDialogContent}/>

            <ToolbarButton label="Button"
                           dialogContent={ButtonDialogContent}/>

            <ToolbarButton label="Submit"
                           dialogContent={SubmitDialogContent}/>

        </div>
    );
}

export {Toolbar};