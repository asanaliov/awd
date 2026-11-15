// Practice 7: promises and async / await (similar to javascript_intro/t3.js)
//
// fakeFetch(id) is given. Do not change it.
// It resolves after 50ms with a string for ids 1 and 3, and rejects for every other id.
//
// a) firstSuccessful(ids) - async function.
//    Tries the ids ONE BY ONE in order and returns the result of the first one that succeeds.
//    If all of them fail, it throws new Error("All failed").
//    (A loop is allowed here.)
//
// b) fetchSummary(ids) - fetches all ids IN PARALLEL and returns
//    { ok: [results that succeeded], failed: [ids that failed] }, both in the same order as ids.
//    It must never reject, even if every id fails.
//    Hint: look up Promise.allSettled.

const data = { 1: "one", 3: "three" };

function fakeFetch(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data[id]) resolve(data[id])
            else reject(new Error(`No data for ${id}`))
        }, 50)
    })
}

async function firstSuccessful(ids) {
    for (const id of ids) {
        try{
         return await fakeFetch(id);
        }catch{}
    }
    throw new Error("All failed")
}

function fetchSummary(ids) {
    const promises = ids.map(id => fakeFetch(id));
    return Promise.allSettled(promises).then(results => {
        const ok = results.filter(r => r.status === "fulfilled").map(r => r.value);
        const failed = ids.filter((id, i) => results[i].status === "rejected")
        return {ok, failed}
    })
}

firstSuccessful([2, 4, 3, 1]).then(console.log)                 // expected: three
firstSuccessful([2, 4]).catch(err => console.log(err.message))  // expected: All failed
fetchSummary([1, 2, 3, 4]).then(console.log)                    // expected: { ok: [ 'one', 'three' ], failed: [ 2, 4 ] }
fetchSummary([]).then(console.log)                              // expected: { ok: [], failed: [] }
