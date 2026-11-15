// Practice 9: maximum subarray sum (Kadane's algorithm, the "big brother" of t6)
//
// Write a function maxSubarraySum(arr) that returns the biggest sum you can get
// from a part of the array where the numbers are next to each other (no skipping).
// The part must contain at least one number.
// For an empty array return 0.
//
// Rule: solve it with a single reduce, no for / while loops.
// Hint: at every number you choose between two options:
//       - continue the current part (add this number to it), or
//       - start a new part from this number
//       Which choice is better can be decided by comparing values.
// Watch out: think carefully about the starting accumulator when ALL numbers are negative.

function maxSubarraySum(arr) {
    if (arr.length === 0) {
        return 0;
    }
    return arr
        .reduce((acc, currentVal) => {
            acc.currentSum = Math.max(acc.currentSum + currentVal, currentVal);
            acc.maxSum = Math.max(acc.currentSum, acc.maxSum);
            return acc;
        }, {currentSum: 0, maxSum: -Infinity}).maxSum;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])) // expected: 6   (4, -1, 2, 1)
console.log(maxSubarraySum([1, 2, 3]))                       // expected: 6   (the whole array)
console.log(maxSubarraySum([5, -9, 6]))                      // expected: 6   (just 6, starting fresh is better)
console.log(maxSubarraySum([3, -1, 4]))                      // expected: 6   (keep going through the -1)
console.log(maxSubarraySum([-3, -1, -2]))                    // expected: -1  (the trap: not 0!)
console.log(maxSubarraySum([7]))                             // expected: 7
console.log(maxSubarraySum([]))                              // expected: 0
