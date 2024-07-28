(()=>{"use strict";var e={338:(e,t,n)=>{var l=n(795);t.createRoot=l.createRoot,t.hydrateRoot=l.hydrateRoot},795:e=>{e.exports=window.ReactDOM}},t={};function n(l){var a=t[l];if(void 0!==a)return a.exports;var r=t[l]={exports:{}};return e[l](r,r.exports,n),r.exports}(()=>{const e=window.React;var t=n(338);function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,l=Array(t);n<t;n++)l[n]=e[n];return l}function a(e,t){if(e){if("string"==typeof e)return l(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var l,a,r,o,u=[],c=!0,i=!1;try{if(r=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(l=r.call(n)).done)&&(u.push(l.value),u.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{if(!c&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(i)throw a}}return u}}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t){var n=t.label,l=t.dialogTitle,a=t.dialogContent,o=r((0,e.useContext)(N),1)[0],u=null!=l?l:"Form Field Wizard : ".concat(n.toUpperCase());return e.createElement("div",{className:"tailor-mail-plus__toolbar__button"},e.createElement("button",{type:"button",className:"button",onClick:function(){o({title:u,content:a})}},n))}function u(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||a(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t){var n=t.rule,l=t.ruleValue,a=t.dragValidatorRuleFromTo,o=r((0,e.useContext)(N),3),u=o[1],c=o[2],i=r((0,e.useState)(!1),2),m=i[0],f=i[1],s=r((0,e.useContext)(v),2),d=s[0],E=s[1];return e.createElement("div",{className:"tailor-mail-plus__validator"+(m?" drag-over":""),draggable:"true",onDragStart:function(e){E(n),f(!1)},onDragEnd:function(e){E(null),f(!1)},onDragOver:function(e){e.preventDefault(),n!==d&&f(!0)},onDragLeave:function(e){f(!1)},onDrop:function(e){a(d,n),f(!1),E(null)}},e.createElement("div",{className:"tailor-mail-plus__validator__label"},l),e.createElement("div",{className:"tailor-mail-plus__validator__cancel",onClick:function(){var e=u.filter((function(e){return e.rule!==n}));c(e)}}))}function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function m(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=i(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var l=n.call(e,"string");if("object"!=i(l))return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==i(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(t){var n=t.id,l=t.label,a=t.name,r=t.value,o=t.multiple,u=t.noRemoveAction,c=t.addFieldMultiple,i=t.deleteFieldMultiple,m=t.keyValidation,f=t.onChange;return e.createElement("div",{className:"tailor-mail-plus__rule-configuration__field-row"},e.createElement("label",null,l),e.createElement("input",{type:"text",name:a,value:r,onKeyDown:function(e){var t=e.key;(1===t.length&&"function"==typeof(null==m?void 0:m.test)&&!m.test(t)||"Enter"===t)&&e.preventDefault()},onChange:function(e){var t=e.target;f(t.value)}}),o?e.createElement("div",{className:"tailor-mail-plus__rule-configuration__action"},u?null:e.createElement("div",{className:"tailor-mail-plus__action-button remove",onClick:function(){i(n)}}),e.createElement("div",{className:"tailor-mail-plus__action-button add",onClick:function(){c(n)}})):null)}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function d(t){var n,l=t.rule,a=t.ruleValidation,o=t.addRule,c=r((0,e.useState)([]),2),i=c[0],d=c[1],v=function(){return"id"+Math.random().toString(16).slice(2)},E=function(e){var t=i.findIndex((function(t){return t.id===e}));if(-1!==t){var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){m(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},i[t]);n.id=v(),n.value="";var l=[];i.forEach((function(t){l.push(t),t.id===e&&l.push(n)})),d(l)}},p=function(e){var t=i.filter((function(t){return t.id!==e}));d(t)};return(0,e.useEffect)((function(){var e=l.split(":")[1];if(e){var t=u(e.matchAll(/[^,]+/g)).flat().map((function(e){return e.replace(/^(.+)_[0-9a-z]$/i,"$1")})).filter((function(e,t,n){return n.indexOf(e)===t})),n="..."===t[t.length-1]?t[t.length-2]:null;n&&t.pop(),d(t.map((function(e){return{id:v(),label:(t=e,t.replace("_"," ").split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" ")),name:e,multiple:n===e,value:""};var t})))}}),[]),e.createElement(e.Fragment,null,l?e.createElement("div",{className:"tailor-mail-plus__rule-configuration"},e.createElement("div",null,(n=i.reduce((function(e,t){return e+(t.multiple?1:0)}),0)<=1,i.map((function(t){return e.createElement(f,{id:t.id,label:t.label,name:t.name,multiple:t.multiple,value:t.value,noRemoveAction:n,addFieldMultiple:E,deleteFieldMultiple:p,keyValidation:a&&a[t.name],onChange:function(e){!function(e,t){var n=i.map((function(n){return n.id===e&&(n.value=t),n}));d(n)}(t.id,e)}})})))),e.createElement("div",{className:"tailor-mail-plus__rule-configuration__button"},e.createElement("button",{type:"button",className:"button",onClick:function(){var e=i.map((function(e){return e.value})).join(",");o(e)}},"Add Rule"))):null)}var v=(0,e.createContext)(),E=/\d/,p=[{rule:"required"},{rule:"email"},{rule:"url"},{rule:"date:format"},{rule:"alpha"},{rule:"numeric"},{rule:"uppercase"},{rule:"lowercase"},{rule:"min:number",ruleValidation:{number:E}},{rule:"max:number",ruleValidation:{number:E}},{rule:"between:min,max",ruleValidation:{min:E,max:E}},{rule:"in:value_1,value_2,...",ruleValidation:{value:/[^,]/i}},{rule:"not_in:value_1,value_2,...",ruleValidation:{value:/[^,]/i}},{rule:"regex:/your-regex/",ruleValidation:{"/your-regex/":/[^,]/}},{rule:"same:another_field",ruleValidation:{another_field:/[\w-]/}},{rule:"different:another_field",ruleValidation:{another_field:/[\w-]/}}];function y(t){var n=t.onChange,l=r((0,e.useContext)(N),3),a=l[1],o=l[2],i=(0,e.useRef)(),m=r((0,e.useState)(!1),2),f=m[0],s=m[1],E=r((0,e.useState)(!1),2),y=E[0],b=E[1],g=r((0,e.useState)(),2),h=g[0],_=g[1],C=r((0,e.useState)([]),2),w=C[0],O=C[1];function x(e,t){var n=[],l=a.find((function(t){return t.rule===e}));l&&(a.forEach((function(a){a.rule===t&&n.push(l),a.rule!==e&&n.push(a)})),o(n))}return(0,e.useEffect)((function(){var e,t=null==i||null===(e=i.current)||void 0===e?void 0:e.value,n=/^[a-z_]+:[\s\S]+/i.test(t);s(!n),_(n?t:null)})),(0,e.useEffect)((function(){n(a.map((function(e){return e.value})).join("|"))}),[a]),e.createElement(e.Fragment,null,e.createElement(v.Provider,{value:[w,O]},e.createElement("div",{className:"tailor-mail-plus__field-validator__indicators"},a.map((function(t,n){return e.createElement(c,{key:n,rule:t.rule,ruleValue:t.value,dragValidatorRuleFromTo:x})})))),e.createElement("div",null,function(){var t,n,l=p.filter((function(e){return!a.find((function(t){return t.rule===e.rule}))}));if(l.length>0)return e.createElement(e.Fragment,null,e.createElement("div",null,e.createElement("select",{name:"validator",ref:i,onChange:function(){b(!y),_(null)}},l.map((function(t,n){var l=t.rule;return e.createElement("option",{key:n,value:l},l)}))),f?e.createElement("button",{type:"button",className:"button",onClick:function(){o([].concat(u(a),[{rule:i.current.value,value:i.current.value}]))}},"Add"):null),h?e.createElement(d,{rule:h,ruleValidation:(t=h,n=p.findIndex((function(e){return e.rule===t})),-1===n?null:p[n].ruleValidation),addRule:function(e){var t=i.current.value,n=t.match(/^(\w+):/)[1];o([].concat(u(a),[{rule:t,value:"".concat(n,":").concat(e)}])),_(null)}}):null)}()))}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function g(e){return e?(Array.isArray(e)||(e=[e]),function(t){var n=t.key;-1!==e.indexOf(n)&&t.preventDefault()}):function(){}}function h(t){var n=t.updatePseudoCode,l="text",a=(0,e.useRef)({label:"",placeholder:"",value:"",name:"",id:"",className:"",validator:""});return e.createElement("div",null,e.createElement("table",{className:"form-table"},e.createElement("tbody",null,e.createElement("tr",null,e.createElement("th",null,"Label"),e.createElement("td",null,e.createElement("input",{type:"text",name:"label",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{label:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Placeholder"),e.createElement("td",null,e.createElement("input",{type:"text",name:"placeholder",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{placeholder:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Value"),e.createElement("td",null,e.createElement("input",{type:"text",name:"value",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{value:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Name"),e.createElement("td",null,e.createElement("input",{type:"text",name:"name",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{name:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Id"),e.createElement("td",null,e.createElement("input",{type:"text",name:"id",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{id:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Class"),e.createElement("td",null,e.createElement("input",{type:"text",name:"className",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{className:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Validators"),e.createElement("td",null,e.createElement(y,{onChange:function(e){n(l,a,{validator:e})}}))))))}function _(t){var n,l=t.updatePseudoCode,a="textarea",r=(0,e.useRef)({label:"",placeholder:"",content:"",rows:"",name:"",id:"",className:"",validator:""});return e.createElement("div",null,e.createElement("table",{className:"form-table"},e.createElement("tbody",null,e.createElement("tr",null,e.createElement("th",null,"Label"),e.createElement("td",null,e.createElement("input",{type:"text",name:"label",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;l(a,r,{label:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Placeholder"),e.createElement("td",null,e.createElement("input",{type:"text",name:"placeholder",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;l(a,r,{placeholder:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Content"),e.createElement("td",null,e.createElement("textarea",{name:"content",rows:"2",onChange:function(e){var t=e.target.value;l(a,r,{content:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Rows"),e.createElement("td",null,e.createElement("input",{type:"text",name:"rows",onKeyDown:(n=/\d/,function(e){var t=e.key;"Enter"===t&&e.preventDefault(),1===t.length&&(n.test(t)||e.preventDefault())}),onChange:function(e){var t=e.target.value;l(a,r,{rows:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Name"),e.createElement("td",null,e.createElement("input",{type:"text",name:"name",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;l(a,r,{name:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Id"),e.createElement("td",null,e.createElement("input",{type:"text",name:"id",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;l(a,r,{id:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Class"),e.createElement("td",null,e.createElement("input",{type:"text",name:"className",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;l(a,r,{className:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Validators"),e.createElement("td",null,e.createElement(y,{onChange:function(e){l(a,r,{validator:e})}}))))))}function C(t){var n=t.updatePseudoCode,l="button",a=(0,e.useRef)({type:"",label:"",variant:"",name:"",id:"",className:""}),r=(0,e.useRef)(),o=(0,e.useRef)();return(0,e.useEffect)((function(){n(l,a,{type:r.current.value,variant:o.current.value})}),[]),e.createElement("div",null,e.createElement("table",{className:"form-table"},e.createElement("tbody",null,e.createElement("tr",null,e.createElement("th",null,"Type"),e.createElement("td",null,e.createElement("select",{name:"type",ref:r,onChange:function(e){var t=e.target.value;n(l,a,{type:t})}},e.createElement("option",{value:""}),e.createElement("option",{value:"button"},"Button"),e.createElement("option",{value:"submit"},"Submit"),e.createElement("option",{value:"reset"},"Reset")))),e.createElement("tr",null,e.createElement("th",null,"Label"),e.createElement("td",null,e.createElement("input",{type:"text",name:"label",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{label:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Variant"),e.createElement("td",null,e.createElement("select",{name:"variant",ref:o,onChange:function(e){var t=e.target.value;n(l,a,{variant:t})}},e.createElement("option",{value:""}),e.createElement("option",{value:"primary"},"Primary"),e.createElement("option",{value:"secondary"},"Secondary"),e.createElement("option",{value:"success"},"Success"),e.createElement("option",{value:"danger"},"Danger"),e.createElement("option",{value:"warning"},"Warning"),e.createElement("option",{value:"info"},"Info"),e.createElement("option",{value:"light"},"Light"),e.createElement("option",{value:"dark"},"Dark")))),e.createElement("tr",null,e.createElement("th",null,"Name"),e.createElement("td",null,e.createElement("input",{type:"text",name:"name",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{name:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Id"),e.createElement("td",null,e.createElement("input",{type:"text",name:"id",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{id:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Class"),e.createElement("td",null,e.createElement("input",{type:"text",name:"className",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{className:t})}}))))))}function w(t){var n=t.updatePseudoCode,l="submit",a=(0,e.useRef)({label:"",variant:"",name:"",id:"",className:""}),r=(0,e.useRef)();return(0,e.useEffect)((function(){n(l,a,{variant:r.current.value})}),[]),e.createElement("div",null,e.createElement("table",{className:"form-table"},e.createElement("tbody",null,e.createElement("tr",null,e.createElement("th",null,"Label"),e.createElement("td",null,e.createElement("input",{type:"text",name:"label",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{label:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Variant"),e.createElement("td",null,e.createElement("select",{name:"variant",ref:r,onChange:function(e){var t=e.target.value;n(l,a,{variant:t})}},e.createElement("option",{value:""}),e.createElement("option",{value:"primary"},"Primary"),e.createElement("option",{value:"secondary"},"Secondary"),e.createElement("option",{value:"success"},"Success"),e.createElement("option",{value:"danger"},"Danger"),e.createElement("option",{value:"warning"},"Warning"),e.createElement("option",{value:"info"},"Info"),e.createElement("option",{value:"light"},"Light"),e.createElement("option",{value:"dark"},"Dark")))),e.createElement("tr",null,e.createElement("th",null,"Name"),e.createElement("td",null,e.createElement("input",{type:"text",name:"name",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{name:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Id"),e.createElement("td",null,e.createElement("input",{type:"text",name:"id",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{id:t})}}))),e.createElement("tr",null,e.createElement("th",null,"Class"),e.createElement("td",null,e.createElement("input",{type:"text",name:"className",onKeyDown:g("Enter"),onChange:function(e){var t=e.target.value;n(l,a,{className:t})}}))))))}function O(){return e.createElement("div",{className:"tailor-mail-plus__toolbar"},e.createElement(o,{label:"Text",dialogContent:h}),e.createElement(o,{label:"Textarea",dialogContent:_}),e.createElement(o,{label:"Button",dialogContent:C}),e.createElement(o,{label:"Submit",dialogContent:w}))}function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){m(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function j(t){var n=t.title,l=t.ContentComponent,a=t.modalVisibilityHandle,o=t.visible,u=r((0,e.useState)(o),2),c=u[0],i=u[1],f=r((0,e.useState)(""),2),s=f[0],d=f[1],v=r((0,e.useContext)(N),3)[2],E=function(){v([]),i(!1),"function"==typeof a&&a(false)};return(0,e.useEffect)((function(){i(o)})),e.createElement(e.Fragment,null,c?e.createElement("div",{className:"tailor-mail-plus__modal__overlay",onClick:function(e){"tailor-mail-plus__modal__overlay"===e.target.className&&E()}},e.createElement("section",{className:"tailor-mail-plus__modal"},e.createElement("header",null,e.createElement("div",null,n),e.createElement("div",{className:"tailor-mail-plus__close__btn",onClick:function(){E()}})),e.createElement("section",{className:"tailor-mail-plus__modal__content"},e.createElement(l,{updatePseudoCode:function(e,t,n){D({},t),t.current=D(D({},t.current),n);var l=function(e,t){var n=[],l="";for(var a in t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){m(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t),t.content&&(l=t.content,t.content=null),t){var r=t[a];a="className"===a?"class":a,r&&n.push(a+'="'+r.replace(/[\u00A0-\u9999<>\&"']/gim,(function(e){return"&#".concat(e.charCodeAt(0),";")}))+'"')}var o=n.join(" ").trim();o=o?" ".concat(o):"";var u="[".concat(e).concat(o,"]");return l&&(u+=l+"[/".concat(e,"]")),u}(e,t.current);d(l)}})),e.createElement("footer",null,e.createElement("div",{className:"tailor-mail-plus__pseudocode"},s),e.createElement("button",{type:"button",className:"button",onClick:function(){var e=document.querySelector(".tailor-mail-plus__form-builder");e&&(e.focus(),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.activeElement,n=[t.selectionStart,t.selectionEnd],l=n[0],a=n[1];t.setRangeText(e,l,a,"select")}(s,e),E())}},"Insert")))):null)}var N=(0,e.createContext)(),S=function(){var t=r((0,e.useState)(!1),2),n=t[0],l=t[1],a=r((0,e.useState)([]),2),o=a[0],u=a[1],c=r((0,e.useState)({title:"",content:null}),2),i=c[0],m=c[1];return e.createElement(N.Provider,{value:[function(e){var t=!!e.title&&null!==e.content;m(e),l(t)},o,u]},e.createElement("div",{id:"tailor-mail-plus-contact-form-toolbar"},e.createElement(O,null),e.createElement(j,{title:i.title,ContentComponent:i.content,visible:n,modalVisibilityHandle:l})))};t.createRoot(document.getElementById("contact-form-toolbar")).render(e.createElement(S,null))})()})();