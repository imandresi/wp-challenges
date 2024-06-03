import React, {useContext, useEffect, useRef, useState} from "react";
import "./validator-indicator.scss";
import {AppContext} from "../App.js";
import {ValidatorContext} from "../FieldValidator/FieldValidator.js";

function ValidatorIndicator({rule, ruleValue, dragValidatorRuleFromTo}) {
    const [, selectedValidators, setSelectedValidators] = useContext(AppContext);
    const [draggedOver, setDraggedOver] = useState(false);
    const [draggedRule, setDraggedRule] = useContext(ValidatorContext);

    return (
        <div className={"tailor-mail__validator" + (draggedOver ? " drag-over" : "")}
             draggable="true"

             onDragStart={e => {
                 setDraggedRule(rule);
                 setDraggedOver(false);
             }}

             onDragEnd={e => {
                 setDraggedRule(null);
                 setDraggedOver(false);
             }}

             onDragOver={e => {
                 e.preventDefault();

                 if (rule !== draggedRule) {
                     setDraggedOver(true);
                 }
             }}

             onDragLeave={e => {
                 setDraggedOver(false);
             }}

             onDrop={e => {
                 dragValidatorRuleFromTo(draggedRule, rule);
                 setDraggedOver(false);
                 setDraggedRule(null);
             }}
        >
            <div className="tailor-mail__validator__label">{ruleValue}</div>
            <div className="tailor-mail__validator__cancel"
                 onClick={() => {
                     const newValidators = selectedValidators.filter(sValidator => sValidator.rule !== rule);
                     setSelectedValidators(newValidators);
                 }}
            ></div>
        </div>
    )
}

export {
    ValidatorIndicator
}