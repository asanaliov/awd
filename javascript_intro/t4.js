function countFalsy(values) {
    let counter = 0;
    for(const value of values){
        if(!value) counter++;
    }
    return counter;
}

function createPlayer(name, lives, volume) {
    if (name === undefined){
        name = "Anonymous"
    }
    if (lives === undefined){
        lives = 3;
    }
    if (volume === undefined){
        volume = 50;
    }
    return name + ' | lives: ' + lives + ' | volume: ' + volume;
}

function coalesce() {
   for (const arg of arguments){
       if (!(arg === null || arg === undefined))
       {
           return arg;
       }
   }
}