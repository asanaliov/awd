// Practice 5: group by key (similar to merge / Join Two Arrays by ID)
//
// Write a function summarizeAccounts(transactions) where every transaction is
// { account, amount, date } and date is a string "YYYY-MM-DD".
//
// Return one object per account:
//   { account, total, count, lastDate }
//   total    - sum of all amounts for that account
//   count    - number of transactions for that account
//   lastDate - the latest date for that account
//              (hint: "YYYY-MM-DD" strings can be compared directly with > and <)
//
// Sort the result by total from highest to lowest.
// If two accounts have the same total, sort them by account name A-Z.
//
// Rule: no for / while loops. The input array must not be changed.

function summarizeAccounts(transactions) {
    return Object.values(transactions
        .reduce((acc, transaction) => {
            let a = acc[transaction.account];
            if (a === undefined) {
                a = {account: transaction.account, total: 0, count: 0, lastDate: ""}
                acc[transaction.account] = a;
            }
            a.total += transaction.amount;
            a.count++;
            if (transaction.date > a.lastDate) {
                a.lastDate = transaction.date;
            }
            return acc;
        }, {})).sort((a, b) => {
        if (a.total !== b.total) return b.total - a.total;
        return a.account.localeCompare(b.account);
    })
}

const transactions = [
    {account: "B7", amount: -20, date: "2026-03-05"},
    {account: "A1", amount: 100, date: "2026-03-01"},
    {account: "C3", amount: 50, date: "2026-01-01"},
    {account: "A1", amount: -30, date: "2026-02-10"},
    {account: "B7", amount: 90, date: "2026-03-02"}
];

console.log(summarizeAccounts(transactions))
// expected:
// [
//   { account: 'A1', total: 70, count: 2, lastDate: '2026-03-01' },
//   { account: 'B7', total: 70, count: 2, lastDate: '2026-03-05' },
//   { account: 'C3', total: 50, count: 1, lastDate: '2026-01-01' }
// ]
console.log(summarizeAccounts([])) // expected: []
