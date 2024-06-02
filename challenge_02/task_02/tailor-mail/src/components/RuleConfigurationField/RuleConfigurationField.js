import React from "react";
import "./rule-configuration-field.scss";

function RuleConfigurationField({label, name, value, multiple, noRemoveAction}) {

    return (
        <div className="tailor-mail__rule-configuration__field-row">
            <label>{label}</label>
            <input type="text"
                   name={name}
            />
            {
                multiple ?
                    (
                        <div className="tailor-mail__rule-configuration__action">
                            {
                                !noRemoveAction ?
                                    (<div className="tailor-mail__action-button remove"></div>)
                                    : null
                            }
                            <div className="tailor-mail__action-button add"></div>
                        </div>
                    ) : null
            }
        </div>
    );
}

export {
    RuleConfigurationField
}

