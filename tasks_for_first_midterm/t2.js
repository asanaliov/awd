function getDoubleN(n){
    return function (){
        n = n * 2;
        return n;
    }
}