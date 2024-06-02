import React, {useContext, useEffect, useRef, useState} from "react";
import {ValidatorIndicator} from "../ValidatorIndicator/ValidatorIndicator.js";
import {AppContext} from "../App.js";
import "./field-validator.scss";
import {RuleConfiguration} from "../RuleConfiguration/RuleConfiguration.js";

const validators = [
    {rule: 'required'},
    {rule: 'email'},
    {rule: 'url'},
    {rule: 'date:format'},
    {rule: 'alpha'},
    {rule: 'numeric'},
    {rule: 'uppercase'},
    {rule: 'lowercase'},
    {rule: 'min:number', paramType: 'number'},
    {rule: 'max:number', paramType: 'number'},
    {rule: 'between:min,max', paramType: 'number'},
    {rule: 'in:value_1,value_2,...', paramType: 'alpha_spaces'},
    {rule: 'not_in:value_1,value_2,...', paramType: 'alpha_spaces'},
    {rule: 'regex:/your-regex/'},
    {rule: 'same:another_field', paramType: 'alpha_dash'},
    {rule: 'different:another_field', paramType: 'alpha_dash'},
];

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
                        return <ValidatorIndicator key={i} rule={ruleObj.value}/>
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
                                            <RuleConfiguration rule={ruleToBeConfigured}/>
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