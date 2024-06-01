import React from "react";
import {FieldValidator} from "../FieldValidator/FieldValidator.js";

function TextDialogContent() {
    return (
        <div>
            <table className="form-table">
                <tbody>
                <tr>
                    <th>Field type</th>
                    <td>
                        <label>
                            <input type="checkbox" name="required"/> Field is required
                        </label>
                    </td>
                </tr>
                <tr>
                    <th>Label</th>
                    <td><input type="text" name="label"/></td>
                </tr>
                <tr>
                    <th>Placeholder</th>
                    <td><input type="text" name="placeholder"/></td>
                </tr>
                <tr>
                    <th>Value</th>
                    <td><input type="text" name="value"/></td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td><input type="text" name="name"/></td>
                </tr>
                <tr>
                    <th>Id</th>
                    <td><input type="text" name="id"/></td>
                </tr>
                <tr>
                    <th>Class</th>
                    <td><input type="text" name="class"/></td>
                </tr>
                <tr>
                    <th>Validators</th>
                    <td>
                        <FieldValidator/>
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