import React, {useContext, useRef} from "react";
import {ValidatorIndicator} from "../ValidatorIndicator/ValidatorIndicator.js";
import {AppContext} from "../App.js";
import "./field-validator.scss";

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
    return (
        <>
            <div className="tailor-mail__field-validator__indicators">
                {
                    selectedValidators.map((rule, i) => {
                        return <ValidatorIndicator key={i} rule={rule}/>
                    })
                }
            </div>
            <div>
                {
                    (function () {
                        const availableValidators = validators.filter(ruleObj => {
                            return !selectedValidators.find(sValidator => sValidator === ruleObj.rule);
                        })

                        if (availableValidators.length > 0) {
                            return (
                                <>
                                    <select name="validator" ref={validatorSelectRef}>
                                        {availableValidators.map((ruleObj, i) => {
                                            const rule = ruleObj.rule;
                                            return (
                                                <option key={i} value={rule}>{rule}</option>
                                            );
                                        })}
                                    </select>

                                    <button type="button"
                                            className="button"
                                            onClick={() => {
                                                setSelectedValidators([...selectedValidators, validatorSelectRef.current.value]);
                                            }}
                                    >Add
                                    </button>

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