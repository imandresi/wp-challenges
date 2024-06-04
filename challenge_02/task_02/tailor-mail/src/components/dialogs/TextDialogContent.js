import React, {useRef, useState} from "react";
import {FieldValidator} from "../FieldValidator/FieldValidator.js";
import {buildPseudoCode, formFieldDisableKeys} from "../../lib/helper.js";

function TextDialogContent({updatePseudoCode}) {

    const componentName = 'text';

    const pseudoCodeAttributes = useRef({
        label: '',
        placeholder: '',
        value: '',
        name: '',
        id: '',
        className: '',
        validator: ''
    });

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
                                   updatePseudoCode(componentName, pseudoCodeAttributes,{label: value})
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
                                   updatePseudoCode(componentName, pseudoCodeAttributes,{placeholder: value})
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
                                   updatePseudoCode(componentName, pseudoCodeAttributes,{value: value})
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
                                   updatePseudoCode(componentName, pseudoCodeAttributes,{name: value})
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
                                   updatePseudoCode(componentName, pseudoCodeAttributes,{id: value})
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
                                   updatePseudoCode(componentName, pseudoCodeAttributes,{className: value})
                               }}
                    /></td>
                </tr>
                <tr>
                    <th>Validators</th>
                    <td>
                        <FieldValidator onChange={value => {
                            updatePseudoCode(componentName, pseudoCodeAttributes,{validator: value});
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