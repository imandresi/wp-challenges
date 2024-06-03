import React, {useRef, useState} from "react";
import {FieldValidator} from "../FieldValidator/FieldValidator.js";
import {buildPseudoCode, formFieldDisableKeys} from "../../lib/helper.js";

function TextDialogContent({setFooter}) {

    const pseudoCodeAttributes = useRef({
        label: '',
        placeholder: '',
        value: '',
        name: '',
        id: '',
        className: '',
        validator: ''
    });

    function updatePseudoCode(value) {
        pseudoCodeAttributes.current = {...pseudoCodeAttributes.current, ...value};

        const pseudoCode = buildPseudoCode('text', pseudoCodeAttributes.current);
        setFooter(pseudoCode);

    }

    return (
        <div>
            <table className="form-table">
                <tbody>
                <tr>
                    <th>Label</th>
                    <td><input type="text"
                               name="label"
                               onKeyDown={formFieldDisableKeys('Enter')}
                               onChange={e => {
                                   const value = e.target.value;
                                   updatePseudoCode({label: value})
                               }}
                    /></td>
                </tr>
                <tr>
                    <th>Placeholder</th>
                    <td><input type="text"
                               name="placeholder"
                               onKeyDown={formFieldDisableKeys('Enter')}
                               onChange={e => {
                                   const value = e.target.value;
                                   updatePseudoCode({placeholder: value})
                               }}
                    /></td>
                </tr>
                <tr>
                    <th>Value</th>
                    <td><input type="text"
                               name="value"
                               onKeyDown={formFieldDisableKeys('Enter')}
                               onChange={e => {
                                   const value = e.target.value;
                                   updatePseudoCode({value: value})
                               }}
                    /></td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td><input type="text"
                               name="name"
                               onKeyDown={formFieldDisableKeys('Enter')}
                               onChange={e => {
                                   const value = e.target.value;
                                   updatePseudoCode({name: value})
                               }}
                    /></td>
                </tr>
                <tr>
                    <th>Id</th>
                    <td><input type="text"
                               name="id"
                               onKeyDown={formFieldDisableKeys('Enter')}
                               onChange={e => {
                                   const value = e.target.value;
                                   updatePseudoCode({id: value})
                               }}
                    /></td>
                </tr>
                <tr>
                    <th>Class</th>
                    <td><input type="text"
                               name="className"
                               onKeyDown={formFieldDisableKeys('Enter')}
                               onChange={e => {
                                   const value = e.target.value;
                                   updatePseudoCode({className: value})
                               }}
                    /></td>
                </tr>
                <tr>
                    <th>Validators</th>
                    <td>
                        <FieldValidator onChange={value => {
                            updatePseudoCode({validator: value});
                        }}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export {
    TextDialogContent
}