import React from "react";
import {ToolbarButton} from "./ToolbarButton.js";
import {TextDialogContent} from "./dialogs/TextDialogContent.js";

function Toolbar() {
    return (
        <div className="tailor-mail__toolbar">
            <ToolbarButton label="Text" dialogContent={TextDialogContent}/>
        </div>
    );
}

export {Toolbar};