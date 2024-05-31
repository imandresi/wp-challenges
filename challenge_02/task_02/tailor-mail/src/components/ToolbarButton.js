import React from "react";

function ToolbarButton({label, dialogContent}) {
    return (
        <div className="tailor-mail__toolbar__button">
            <button type="button" className="button">{label}</button>
        </div>
    );
}

export {
    ToolbarButton
}