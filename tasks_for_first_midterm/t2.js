function getDoubleN(n){
    return function (){
        n = n * 2;
        return n;
    }
}
const test1 = getDoubleN(3);
console.log(test1());
console.log(test1());
console.log(test1());