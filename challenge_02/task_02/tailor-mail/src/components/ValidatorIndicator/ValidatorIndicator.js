import React, {useContext} from "react";
import "./validator-indicator.scss";
import {AppContext} from "../App.js";

function ValidatorIndicator({rule, ruleValue}) {
    const [, selectedValidators, setSelectedValidators] = useContext(AppContext);

    return (
        <div className="tailor-mail__validator">
            <div className="tailor-mail__validator__label">{ruleValue}</div>
            <div className="tailor-mail__validator__cancel"
                 onClick={() => {
                     const newValidators = selectedValidators.filter(sValidator => sValidator.rule !== rule);
                     setSelectedValidators(newValidators);
                 }}
            ></div>
        </div>
    )
}

export {
    ValidatorIndicator
}