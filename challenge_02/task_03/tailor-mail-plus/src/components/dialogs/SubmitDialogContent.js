import React, {useEffect, useRef} from "react";
import {formFieldDisableKeys} from "../../lib/helper.js";
import {FieldValidator} from "../FieldValidator/FieldValidator.js";

function SubmitDialogContent({updatePseudoCode}) {

    const componentName = 'submit';

    const pseudoCodeAttributes = useRef({
        label: '',
        variant: '',
        name: '',
        id: '',
        className: ''
    });

    const variantElRef = useRef();

    useEffect(() => {
        updatePseudoCode(componentName, pseudoCodeAttributes, {
            variant: variantElRef.current.value
        });
    }, []);

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
                                   updatePseudoCode(componentName, pseudoCodeAttributes, {label: value})
                               }}
                    /></td>
                </tr>
                <tr>
                    <th>Variant</th>
                    <td>
                        <select name="variant"
                                ref={variantElRef}
                                onChange={e => {
                                    const value = e.target.value;
                                    updatePseudoCode(componentName, pseudoCodeAttributes, {variant: value})
                                }}
                        >
                            <option value=""></option>
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="success">Success</option>
                            <option value="danger">Danger</option>
                            <option value="warning">Warning</option>
                            <option value="info">Info</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td><input type="text"
                               name="name"
                               onKeyDown={formFieldDisableKeys('Enter')}
                               onChange={e => {
                                   const value = e.target.value;
                                   updatePseudoCode(componentName, pseudoCodeAttributes, {name: value})
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
                                   updatePseudoCode(componentName, pseudoCodeAttributes, {id: value})
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
                                   updatePseudoCode(componentName, pseudoCodeAttributes, {className: value})
                               }}
                    /></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export {
    SubmitDialogContent
}

