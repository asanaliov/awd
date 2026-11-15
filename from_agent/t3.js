// Practice 3: history / undo (similar to historize)
//
// Write a function createUndoableText() that returns an object with these methods:
//
// type(str) - appends str to the end of the current text.
//             Typing something new clears everything that could be redone.
// undo()    - reverts the last type() that hasn't been undone yet.
//             Returns true if something was undone, false if there was nothing to undo.
// redo()    - re-applies the last undone type().
//             Returns true if something was redone, false if there was nothing to redo.
// value()   - returns the current text (a string)
//
// Think about it first: what do you need to remember, and in what order do you take it out?

function createUndoableText() {
    let text = []
    let undone = []
    function type(str){
        text.push(str);
        undone = [];
    }
    function undo(){
        let u = text.pop();
        if (u === undefined) return false;
        undone.push(u);
        return true;
    }
    function redo(){
        let lastUndone = undone.pop();
        if (lastUndone === undefined) return false;
        text.push(lastUndone);
        return true;
    }
    function value(){
        return text.join("");
    }
    return {
        type, undo, redo, value
    }
}

const t = createUndoableText()
t.type("Hello")
t.type(" world")
console.log(t.value()) // expected: "Hello world"
console.log(t.undo())  // expected: true
console.log(t.value()) // expected: "Hello"
console.log(t.redo())  // expected: true
console.log(t.value()) // expected: "Hello world"
t.undo()
t.type("!")
console.log(t.value()) // expected: "Hello!"
console.log(t.redo())  // expected: false   (typing cleared the redo history)
t.undo()
t.undo()
console.log(t.value()) // expected: ""
console.log(t.undo())  // expected: false

