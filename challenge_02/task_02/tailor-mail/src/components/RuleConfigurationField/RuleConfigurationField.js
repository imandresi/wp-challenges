import React from "react";
import "./rule-configuration-field.scss";

function RuleConfigurationField({
                                    id,
                                    label,
                                    name,
                                    value,
                                    multiple,
                                    noRemoveAction,
                                    addFieldMultiple,
                                    deleteFieldMultiple,
                                    keyValidation,
                                    onChange
                                }) {

    return (
        <div className="tailor-mail__rule-configuration__field-row">
            <label>{label}</label>
            <input type="text"
                   name={name}
                   value={value}
                   onKeyDown={e => {
                       const key = e.key;
                       if (((key.length === 1) && (keyValidation) && (!keyValidation.test(key))) ||
                           (key === 'Enter')) {
                           e.preventDefault();
                       }
                   }}
                   onChange={e => {
                       const target = e.target;
                       onChange(target.value);
                   }}
            />
            {
                multiple ?
                    (
                        <div className="tailor-mail__rule-configuration__action">
                            {
                                !noRemoveAction ?
                                    (
                                        <div className="tailor-mail__action-button remove"
                                             onClick={() => {
                                                 deleteFieldMultiple(id);
                                             }}
                                        ></div>

                                    ) : null
                            }
                            <div className="tailor-mail__action-button add"
                                 onClick={() => {
                                     addFieldMultiple(id);
                                 }}
                            ></div>
                        </div>
                    ) : null
            }
        </div>
    );
}

export {
    RuleConfigurationField
}

