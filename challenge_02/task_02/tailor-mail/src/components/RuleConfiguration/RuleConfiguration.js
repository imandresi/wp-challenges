import React, {useEffect, useState} from "react";
import "./rule-configuration.scss";
import {RuleConfigurationField} from "../RuleConfigurationField/RuleConfigurationField.js";

function RuleConfiguration({rule}) {

    const [fields, setFields] = useState([]);

    useEffect(() => {
        const strFields = rule.split(':')[1];
        if (!strFields) return;

        const fieldNames =
            [...strFields.matchAll(/[^,]+/g)]
                .flat()
                .map(v => v.replace(/^(.+)_[0-9a-z]$/i, "$1"))
                .filter((v, i, arr) => arr.indexOf(v) === i);

        const fieldMultiple = fieldNames[fieldNames.length - 1] === '...' ? fieldNames[fieldNames.length - 2] : null;

        const makeLabel = (name) => {
            return name
                .replace('_', ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };


        if (fieldMultiple) {
            fieldNames.pop();
        }

        setFields(
            fieldNames.map(fieldName => {
                return {
                    label: makeLabel(fieldName),
                    name: fieldName,
                    multiple: fieldMultiple === fieldName,
                    value: ''
                }
            })
        );

    }, []);

    return (
        <>
            {
                rule ? (
                    <div className="tailor-mail__rule-configuration">
                        <div>
                            {
                                (function() {
                                    const multipleCount = fields.reduce((finalValue, value) => {
                                        return finalValue + (value.multiple ? 1 : 0);
                                    }, 0);

                                    const noRemoveAction = multipleCount <= 1;

                                    return fields.map(field => {
                                        return (
                                            <RuleConfigurationField
                                                label={field.label}
                                                name={field.name}
                                                multiple={field.multiple}
                                                value={field.value}
                                                noRemoveAction={noRemoveAction}
                                            />
                                        );
                                    });

                                })()
                            }
                        </div>
                        <div className="tailor-mail__rule-configuration__button">
                            <button type="button"
                                    className="button"
                            >Add Rule
                            </button>
                        </div>

                    </div>
                ) : null

            }
        </>
    );
}

export {
    RuleConfiguration
}