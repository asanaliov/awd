function historize(obj) {
    const changes = []

    function value() {
        return obj;
    }

    function change(n) {
        changes.push(n)
    }

    function apply(i) {
        if (i === undefined) {
            i = changes.length;
        }
        for (let j = 0; j < i; j++) {
            Object.assign(obj, changes.shift())
        }
    }

    function rollback(x) {
        if (x === undefined) {
            x = 1;
        }
        for (let i = 0; i < x; i++) {
            changes.pop();
        }
    }

    function get(i) {
        return changes[i - 1];
    }

    return {value: value(), change, apply, rollback, get}
}