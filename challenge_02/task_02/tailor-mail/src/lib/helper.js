function formFieldDisableKeys(forbiddenKeys) {

    if (!forbiddenKeys) {
        return () => {
        };
    }

    if (!Array.isArray(forbiddenKeys)) {
        forbiddenKeys = [forbiddenKeys];
    }

    return (e) => {
        const currentKey = e.key;
        if (forbiddenKeys.indexOf(currentKey) !== -1) {
            e.preventDefault();
        }
    };
}

function formFieldAllowRegex(regex) {
    return (e) => {
        const currentKey = e.key;

        if (currentKey === 'Enter') {
            e.preventDefault();
        }

        if (currentKey.length === 1) {
            if (!regex.test(currentKey)) {
                e.preventDefault();
            }
        }

    }
}

function buildPseudoCode(name, attributes) {
    const pseudoCodeBuffer = [];
    let content = '';

    if (attributes['content']) {
        content = attributes['content'];
        attributes['content'] = null;
    }

    for (let key in attributes) {
        const value = attributes[key];
        key = key === 'className' ? 'class' : key;

        if (value) {
            pseudoCodeBuffer.push(key + '="' + htmlEntities(value) + '"');
        }
    }

    let compiledAttributes = pseudoCodeBuffer.join(' ').trim();
    compiledAttributes = compiledAttributes ? ` ${compiledAttributes}`: '';

    let pseudoCode = `[${name}${compiledAttributes}]`;

    if (content) {
        pseudoCode += content + `[/${name}]`;
    }

    return pseudoCode;
}

function htmlEntities(str) {
    return str.replace(/[\u00A0-\u9999<>\&"']/gim, function(i) {
        return `&#${i.charCodeAt(0)};`;
    });
}

function htmlEntityDecode(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function typeInTextarea(newText, el = document.activeElement) {
    const [start, end] = [el.selectionStart, el.selectionEnd];
    el.setRangeText(newText, start, end, 'select');
}

export {
    formFieldDisableKeys,
    formFieldAllowRegex,
    buildPseudoCode,
    htmlEntities,
    htmlEntityDecode,
    typeInTextarea
}