// Practice 1: closure factory (similar to createTagCollector / historize)
//
// Write a function createInventory() that returns an object with these methods.
// The stock must stay private (not reachable from outside).
//
// addItem(name, qty)    - adds qty to the item's stock (adds up if the item already exists)
// removeItem(name, qty) - subtracts qty from the item's stock.
//                         If the stock goes to 0 or below, the item is removed completely.
//                         Returns false if the item doesn't exist, otherwise true.
// getQty(name)          - returns the current stock, or 0 if the item doesn't exist
// report()              - returns an array of strings "name: qty", sorted alphabetically by name
//
// Rule: report() must use array methods (no for / while loops).

function createInventory() {
    let items = new Map()
    function addItem(name, qty){
        if (!items.has(name)){
            items.set(name, qty);
        }else{
            items.set(name, items.get(name) + qty);
        }
    }
    function removeItem(name, qty){
        if (!items.has(name)){
            return false;
        }
        let itemQ = items.get(name)
        items.set(name, itemQ  - qty);
        if (items.get(name) <= 0) items.delete(name);
        return true;
    }
    function getQty(name){
        if (!items.has(name)) return 0;
        return items.get(name);
    }
    function report(){
        return Array.from(items).sort((a, b) => a[0].localeCompare(b[0]))
            .map(([n, q]) => `${n}: ${q}`);
    }
    return { addItem, removeItem, getQty, report}
}

const inv = createInventory()
inv.addItem("apple", 5)
inv.addItem("pear", 2)
inv.addItem("apple", 3)
console.log(inv.getQty("apple"))       // expected: 8
console.log(inv.removeItem("pear", 5)) // expected: true
console.log(inv.getQty("pear"))        // expected: 0
console.log(inv.removeItem("kiwi", 1)) // expected: false
inv.addItem("banana", 1)
console.log(inv.report())              // expected: [ 'apple: 8', 'banana: 1' ]
console.log(inv.stock)                 // expected: undefined  (private!)
