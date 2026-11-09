function getType(value) {
    if (value === null)
        return "null"
    if (Number.isNaN(value))
        return "nan"
    if (typeof value === "object"){
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    }
    return typeof value;
}

function typeSummary(values) {
    const counts = {}
    for (const value of values){
        const type = getType(value)
        counts[type] = (counts[type] || 0) + 1
    }
    return Object.keys(counts).map(c => c + ": " + counts[c]).join(", ")
}

function isEmpty(value) {
    const type = getType(value)
    if (type === "null" || type === "undefined") return true;
    if (type === "string") return value.trim().length === 0;
    if (type === "array") return value.length === 0;
    if (type === "object") return Object.keys(value).length === 0;
    return false;
}
// ===== Tests =====

let passed = 0, failed = 0;
function check(label, got, expected) {
    if (got === expected) {
        passed++;
    } else {
        failed++;
        console.log("FAIL " + label + " -> got " + JSON.stringify(got) + ", expected " + JSON.stringify(expected));
    }
}

// (a) getType: primitives
check("getType(42)", getType(42), "number");
check("getType('42')", getType("42"), "string");
check("getType(true)", getType(true), "boolean");
check("getType(undefined)", getType(undefined), "undefined");
check("getType(10n)", getType(10n), "bigint");
check("getType(Symbol)", getType(Symbol("id")), "symbol");
check("getType(Infinity)", getType(Infinity), "number");
check("getType(function)", getType(function () {}), "function");
check("getType(arrow)", getType(() => 1), "function");

// (a) getType: the surprising cases
check("getType(null)", getType(null), "null");
check("getType(NaN)", getType(NaN), "nan");
check("getType(0/0)", getType(0 / 0), "nan");
check("getType('abc' not NaN)", getType("abc"), "string");

// (a) getType: objects
check("getType([])", getType([1, 2, 3]), "array");
check("getType(Date)", getType(new Date()), "date");
check("getType(RegExp)", getType(/abc/), "regexp");
check("getType(Map)", getType(new Map()), "map");
check("getType(Set)", getType(new Set()), "set");
check("getType({})", getType({}), "object");
check("getType(Error)", getType(new Error("x")), "error");

// (b) typeSummary
check("summary example", typeSummary([1, "a", 2, null]), "number: 2, string: 1, null: 1");
check("summary empty", typeSummary([]), "");
check("summary one", typeSummary([true]), "boolean: 1");
check("summary order", typeSummary([null, "a", 1, "b"]), "null: 1, string: 2, number: 1");
check("summary objects", typeSummary([[], {}, [], new Date()]), "array: 2, object: 1, date: 1");
check("summary NaN", typeSummary([NaN, 1, NaN]), "nan: 2, number: 1");
check("summary undefined", typeSummary([undefined, null]), "undefined: 1, null: 1");

// (c) isEmpty: should be true
check("isEmpty(null)", isEmpty(null), true);
check("isEmpty(undefined)", isEmpty(undefined), true);
check("isEmpty('')", isEmpty(""), true);
check("isEmpty('   ')", isEmpty("   "), true);
check("isEmpty([])", isEmpty([]), true);
check("isEmpty({})", isEmpty({}), true);

// (c) isEmpty: should be false
check("isEmpty(0)", isEmpty(0), false);
check("isEmpty(false)", isEmpty(false), false);
check("isEmpty(NaN)", isEmpty(NaN), false);
check("isEmpty('a')", isEmpty("a"), false);
check("isEmpty(' a ')", isEmpty(" a "), false);
check("isEmpty([0])", isEmpty([0]), false);
check("isEmpty([undefined])", isEmpty([undefined]), false);
check("isEmpty({a:1})", isEmpty({ a: 1 }), false);
check("isEmpty(Date)", isEmpty(new Date()), false);
check("isEmpty(Map)", isEmpty(new Map()), false);
check("isEmpty(function)", isEmpty(function () {}), false);

console.log(passed + " passed, " + failed + " failed");
