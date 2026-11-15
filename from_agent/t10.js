// Practice 10: Kadane, but return the part itself (follow-up to t9)
//
// Write a function maxSubarray(arr) that returns the PART of the array
// (numbers next to each other, at least one number) that has the biggest sum.
// For an empty array return [].
//
// If several parts have the same biggest sum, return the one that starts first.
// If they also start at the same position, return the shorter one.
//
// Rule: solve it with a single reduce, no for / while loops.
// Hint: you don't need to build arrays while going through. Remember POSITIONS (indexes)
//       and cut the part out once at the end. Look up arr.slice(start, end).
// Hint: compare with your t9. Which extra things do you need to remember,
//       and at which moment does each of them change?

function maxSubarray(arr) {
    if (arr.length === 0) return [];
    const result = arr
        .reduce((acc, curr, currIndex) =>{
            if (curr > acc.currentSum + curr){
                acc.currentSum = curr;
                acc.startIndex = currIndex;
            }else {
                acc.currentSum += curr;
            }
            if(acc.currentSum > acc.maxSum){
                acc.maxSum = acc.currentSum;
                acc.bestStart = acc.startIndex;
                acc.bestEnd = currIndex;
            }
            return acc;
        }, {currentSum: 0, maxSum: -Infinity, startIndex: 0, bestStart: 0, bestEnd: 0});
    return arr.slice(result.bestStart , result.bestEnd + 1);
}

console.log(maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])) // expected: [ 4, -1, 2, 1 ]
console.log(maxSubarray([1, 2, 3]))                       // expected: [ 1, 2, 3 ]
console.log(maxSubarray([5, -9, 6]))                      // expected: [ 6 ]
console.log(maxSubarray([3, -1, 4]))                      // expected: [ 3, -1, 4 ]
console.log(maxSubarray([-3, -1, -2]))                    // expected: [ -1 ]
console.log(maxSubarray([7]))                             // expected: [ 7 ]
console.log(maxSubarray([]))                              // expected: []
console.log(maxSubarray([1, -1, 1]))                      // expected: [ 1 ]   (sums tie: starts first, then shorter)
