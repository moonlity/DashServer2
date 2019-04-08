var SETTING = SETTING || {};

SETTING.createNameSpace = function(nsValue) {
    var parts = nsValue.split('.'),
        parent = SETTING,
        i;

    if (parts[0] === "SETTING") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};