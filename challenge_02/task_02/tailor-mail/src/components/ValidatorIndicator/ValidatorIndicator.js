import React from "react";
import "./validator-indicator.scss";
function ValidatorIndicator({rule}) {
    return (
        <div className="tailor-mail__validator">
            <div className="tailor-mail__validator__label">{rule}</div>
            <div className="tailor-mail__validator__cancel"></div>
        </div>
    )
}

export {
    ValidatorIndicator
}