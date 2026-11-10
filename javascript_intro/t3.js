const db = {
    users: {1: {id: 1, name: 'Ana'}, 2: {id: 2, name: 'Bojan'}},
    posts: {1: ['Hello JS', 'Closures are fun'], 2: []}
};

function delay(ms, value) {
    return new Promise(
        resolve => setTimeout(() => resolve(value), ms)
    )
}

function getUser(id) {
    return new Promise(
        ((resolve, reject) => {
            setTimeout(() => {
                const user = db.users[id];
                if (user) resolve(user)
                else reject(new Error(`User ${id} not found`))
            }, 50)
        })
    )
}

function getPosts(userId) {
    return delay(50, db.posts[userId] || [])
}
function getSummaryThen(id) {
    return getUser(id)
        .then(user => getPosts(id)
            .then(posts => `${user.name} has ${posts.length} posts`))
        .catch(err => `Error: ${err.message}`);
}

async function getSummaryAsync(id) {
    try{
        const user = await getUser(id)
        const posts = await getPosts(id)
        return `${user.name} has ${posts.length} posts`
    }catch (err){
        return `Error: ${err.message}`;
    }
}

async function getSummaries(ids) {
    const result = []
    for (const id of ids){
        result.push(await getSummaryAsync(id));
    }
    return result;
}

function getSummariesParallel(ids) {
    return Promise.all(ids.map(id => getSummaryAsync(id)))
}

async function retry(fn, attempts) {
    let lastError;
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        }catch (err){
            lastError = err;
        }
    }
    throw lastError;

}
// rules: getUser uses new Promise; getSummaryThen uses no async / await; getSummaryAsync and retry are async
const kind = f => f.constructor.name;
console.log(/new Promise/.test(getUser.toString()), kind(getSummaryThen), /\bawait\b/.test(getSummaryThen.toString()));
console.log(kind(getSummaryAsync), kind(retry));
getSummaryThen(2).then(console.log);