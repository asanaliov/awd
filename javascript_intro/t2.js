class BankAccount{
    id;
    static #counter = 0;
    owner;
    #balance = 0;
    #history = []

    constructor(owner) {
        this.owner = owner;
        BankAccount.#counter ++;
        this.id = "ACC-" + String(BankAccount.#counter).padStart(3, "0")
    }
    get balance(){
        return this.#balance;
    }

    #validate(amount){
        if(typeof amount != "number" || !(amount > 0)){
            throw new Error("Amount must be a positive number");
        }
    }
    deposit(amount){
        this.#validate(amount);
        this.#balance += amount;
        this.#history.push("+" + amount.toFixed(2));

        return this;

    }

    withdraw(amount){
        this.#validate(amount)
        if(amount > this.#balance){
            throw new Error("Insufficient funds");
        }
        this.#balance -= amount;
        this.#history.push("-" + amount.toFixed(2))

        return this;
    }
    history(){
        return this.#history.slice()
    }

    static transfer(from, to, amount){
        from.withdraw(amount)
        to.deposit(amount)
    }
    toString(){
        return this.id + " (" + this.owner + "): " + this.#balance.toFixed(2) + " EUR"
    }
}
class SavingsAccount extends BankAccount{
    rate;
    maxWithdrawals;
    #withdrawals = 0;
    constructor(owner, rate, maxWithdrawals = 3) {
        super(owner);
        this.rate = rate;
        this.maxWithdrawals = maxWithdrawals;
    }
    addInterest(){
        const interest = this.balance * this.rate;
        if(interest > 0){
            this.deposit(interest)
        }
        return this;
    }
    withdraw(amount) {
        if(this.#withdrawals >= this.maxWithdrawals){
            throw new Error("Withdrawal limit reached");
        }
        super.withdraw(amount);
        this.#withdrawals++;
        return this;
    }
    resetMonth(){
        this.#withdrawals = 0;
        return this;
    }

}
// (a) id, owner, balance, toString() and private state
const ana = new BankAccount('Ana');
const bojan = new BankAccount('Bojan');
ana.deposit(100).withdraw(30);
console.log(ana.owner, ana.balance, /^ACC-\d{3}$/.test(ana.id), Number(bojan.id.slice(4)) - Number(ana.id.slice(4)));
console.log(String(ana).replace(ana.id, '<id>'));
console.log(ana['#balance'], Object.keys(ana).sort().join(','));
const balance = Object.getOwnPropertyDescriptor(BankAccount.prototype, 'balance');
console.log(typeof balance.get, typeof balance.set);