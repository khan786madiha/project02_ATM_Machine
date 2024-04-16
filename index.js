#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
class ATM {
    account;
    constructor() {
        this.account = { balance: 1000000 };
    }
    deposit(amount) {
        this.account.balance += amount;
        console.log(chalk.green(`Deposited $${amount} successfully!`));
    }
    withdraw(amount) {
        if (amount <= this.account.balance) {
            this.account.balance -= amount;
            console.log(chalk.green(`Withdrawn $${amount} successfully!`));
        }
        else {
            console.log(chalk.red('Insufficient funds!'));
        }
    }
    checkBalance() {
        console.log(chalk.blue(`Current balance: $${this.account.balance}`));
    }
}
async function main() {
    const atm = new ATM();
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Deposit Cash', 'Withdraw Cash', 'Check Balance', 'Exit']
            }
        ]);
        if (action === 'Deposit Cash') {
            const { amount } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'amount',
                    message: 'Enter amount to deposit:'
                }
            ]);
            atm.deposit(amount);
        }
        else if (action === 'Withdraw Cash') {
            const { amount } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'amount',
                    message: 'Enter amount to withdraw:'
                }
            ]);
            atm.withdraw(amount);
        }
        else if (action === 'Check Balance') {
            atm.checkBalance();
        }
        else if (action === 'Exit') {
            console.log(chalk.yellow('Exiting...'));
            break;
        }
    }
}
main();
