import React, {useEffect, useState} from "react";
import "./rule-configuration.scss";
import {RuleConfigurationField} from "../RuleConfigurationField/RuleConfigurationField.js";

function RuleConfiguration({rule, ruleValidation, addRule}) {

    const [fields, setFields] = useState([]);

    const uniqueId = () => "id" + Math.random().toString(16).slice(2);

    const addFieldMultiple = (fieldId) => {

        const fieldIndex = fields.findIndex((field) => {
            return field.id === fieldId;
        });

        if (fieldIndex === -1) {
            return;
        }

        const newAddedField = {...fields[fieldIndex]};
        newAddedField.id = uniqueId();
        newAddedField.value = '';

        const newFields = [];
        fields.forEach(field => {
            newFields.push(field);
            if (field.id === fieldId) {
                newFields.push(newAddedField);
            }
        });

        setFields(newFields);
    }

    const deleteFieldMultiple = (fieldId) => {
        const newFields = fields.filter(field => field.id !== fieldId);
        setFields(newFields);

    }

    const setFieldValue = (fieldId, value) => {
        const newFields = fields.map(field => {
            if (field.id === fieldId) {
                field.value = value;
            }
            return field;
        });

        setFields(newFields);
    }

    const buildRuleValue = () => {
        return fields.map(field => field.value).join(',');

    }

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
                    id: uniqueId(),
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
                    <div className="tailor-mail-plus__rule-configuration">
                        <div>
                            {
                                (function () {
                                    const multipleCount = fields.reduce((finalValue, value) => {
                                        return finalValue + (value.multiple ? 1 : 0);
                                    }, 0);

                                    const noRemoveAction = multipleCount <= 1;

                                    return fields.map(field => {
                                        return (
                                            <RuleConfigurationField
                                                id={field.id}
                                                label={field.label}
                                                name={field.name}
                                                multiple={field.multiple}
                                                value={field.value}
                                                noRemoveAction={noRemoveAction}
                                                addFieldMultiple={addFieldMultiple}
                                                deleteFieldMultiple={deleteFieldMultiple}
                                                keyValidation={ruleValidation && ruleValidation[field.name]}
                                                onChange={value => {
                                                    setFieldValue(field.id, value);
                                                }}

                                            />
                                        );
                                    });

                                })()
                            }
                        </div>
                        <div className="tailor-mail-plus__rule-configuration__button">
                            <button type="button"
                                    className="button"
                                    onClick={() => {
                                        const ruleValue = buildRuleValue();
                                        addRule(ruleValue);
                                    }}
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