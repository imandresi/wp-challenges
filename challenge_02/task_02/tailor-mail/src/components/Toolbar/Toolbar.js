import React from "react";
import {ToolbarButton} from "../ToolBarButton/ToolbarButton.js";
import {TextDialogContent} from "../dialogs/TextDialogContent.js";
import {TextareaDialogContent} from "../dialogs/TextareaDialogContent.js";

function Toolbar() {
    return (
        <div className="tailor-mail__toolbar">
            <ToolbarButton label="Text"
                           dialogContent={TextDialogContent}/>
            <ToolbarButton label="Textarea"
                           dialogContent={TextareaDialogContent}/>
        </div>
    );
}

export {Toolbar};