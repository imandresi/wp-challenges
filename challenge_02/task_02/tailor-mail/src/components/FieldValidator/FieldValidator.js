import React, {useContext, useEffect, useRef, useState} from "react";
import {ValidatorIndicator} from "../ValidatorIndicator/ValidatorIndicator.js";
import {AppContext} from "../App.js";
import "./field-validator.scss";
import {RuleConfiguration} from "../RuleConfiguration/RuleConfiguration.js";

export const REGEX_NUMBER = /\d/;

const validators = [
    {rule: 'required'},
    {rule: 'email'},
    {rule: 'url'},
    {rule: 'date:format'},
    {rule: 'alpha'},
    {rule: 'numeric'},
    {rule: 'uppercase'},
    {rule: 'lowercase'},
    {rule: 'min:number', ruleValidation: {number: REGEX_NUMBER}},
    {rule: 'max:number', ruleValidation: {number: REGEX_NUMBER}},
    {rule: 'between:min,max', ruleValidation: {min: REGEX_NUMBER, max: REGEX_NUMBER}},
    {rule: 'in:value_1,value_2,...', ruleValidation: {value: /[a-z0-9 ]/i}},
    {rule: 'not_in:value_1,value_2,...', ruleValidation: {value: /[a-z0-9 ]/i}},
    {rule: 'regex:/your-regex/', ruleValidation: {'/your-regex/': /[^,]/}},
    {rule: 'same:another_field', ruleValidation: {another_field: /[\w-]/}},
    {rule: 'different:another_field',  ruleValidation: {another_field: /[\w-]/}}
];

function getRuleValidation(rule) {
    const index = validators.findIndex(validator => {
        return validator.rule === rule;
    })

    if (index === -1) return null;

    return validators[index]['ruleValidation'];
}

function FieldValidator() {
    const [, selectedValidators, setSelectedValidators] = useContext(AppContext);
    const validatorSelectRef = useRef();
    const [showAddBtn, setShowAddBtn] = useState(false);
    const [update, setUpdate] = useState(false);
    const [ruleToBeConfigured, setRuleToBeConfigured] = useState();

    function validatorNeedsConfiguration(validatorRule) {
        const regex = /^[a-z_]+:.+/is;
        return regex.test(validatorRule);
    }

    useEffect(() => {
        const selectedRule = validatorSelectRef.current.value;
        const configureRule = validatorNeedsConfiguration(selectedRule);
        setShowAddBtn(!configureRule);
        setRuleToBeConfigured(configureRule ? selectedRule : null);
    });

    return (
        <>
            <div className="tailor-mail__field-validator__indicators">
                {
                    selectedValidators.map((ruleObj, i) => {
                        return <ValidatorIndicator key={i}
                                                   rule={ruleObj.rule}
                                                   ruleValue={ruleObj.value}

                        />
                    })
                }
            </div>
            <div>
                {
                    (function () {
                        const availableValidators = validators.filter(ruleObj => {
                            return !selectedValidators.find(sValidator => sValidator.rule === ruleObj.rule);
                        })

                        if (availableValidators.length > 0) {
                            return (
                                <>
                                    <div>
                                        <select name="validator"
                                                ref={validatorSelectRef}
                                                onChange={() => {
                                                    setUpdate(!update);
                                                    setRuleToBeConfigured(null);
                                                }}
                                        >
                                            {availableValidators.map((ruleObj, i) => {
                                                const rule = ruleObj.rule;
                                                return (
                                                    <option key={i} value={rule}>{rule}</option>
                                                );
                                            })}
                                        </select>

                                        {
                                            showAddBtn ? (
                                                <button type="button"
                                                        className="button"
                                                        onClick={() => {
                                                            setSelectedValidators([
                                                                ...selectedValidators,
                                                                {
                                                                    rule: validatorSelectRef.current.value,
                                                                    value: validatorSelectRef.current.value,
                                                                }
                                                            ]);
                                                        }}
                                                >Add
                                                </button>
                                            ) : null
                                        }

                                    </div>
                                    {
                                        ruleToBeConfigured ?
                                            <RuleConfiguration rule={ruleToBeConfigured}
                                                               ruleValidation={getRuleValidation(ruleToBeConfigured)}
                                                               addRule={value => {
                                                                   const selectedRule = validatorSelectRef.current.value;
                                                                   const ruleName = selectedRule.match(/^(\w+):/)[1];
                                                                   setSelectedValidators([
                                                                       ...selectedValidators,
                                                                       {
                                                                           rule: selectedRule,
                                                                           value: `${ruleName}:${value}`,
                                                                       }
                                                                   ]);
                                                                   setRuleToBeConfigured(null);
                                                               }}
                                            />
                                            : null
                                    }

                                </>
                            )
                        }

                    })()


                }

            </div>
        </>
    )
        ;
}

export {
    FieldValidator
}