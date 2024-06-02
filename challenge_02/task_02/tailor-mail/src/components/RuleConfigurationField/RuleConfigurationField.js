import React from "react";
import "./rule-configuration-field.scss";

function RuleConfigurationField({label, name, value, multiple}) {

    return (
        <div className="tailor-mail__rule-configuration__field-row">
            <label>{label}</label>
            <input type="text"
                   name={name}
            />
            <div className="tailor-mail__rule-configuration__action remove"></div>
            <div className="tailor-mail__rule-configuration__action add"></div>
        </div>
    );
}

export {
    RuleConfigurationField
}

