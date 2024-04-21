#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

//initialize user balance and pin code
let myBalance = 5000;
let myPin = 12345;

//Print Welcome Message
console.log(chalk.blue("\n \twelcome to code with Rafia  - ATM machine\n "));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:"),
    }
])
if (pinAnswer.pin === myPin){
    console.log(chalk.green("pin is correct, login successfully!"));
    //console.log('Current Account Balance is $ {myBalance}')
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("select an operation:"),
            choices: ["withdraw Amount" , "check Balance"]
        }
    ])
    if(operationAns.operation === "withdraw Amount" ){
        let withdrawAns = await inquirer.prompt([
            {
                name : "withdrawMethod",
                type: "list",
                message:chalk.yellow("select a withdrawal method:"),
                choices:["Fast cash", "Enter Amount"]

            }
        ])
        if(withdrawAns.withdrawMethod === "Fast cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name :"fastCash",
                    type:"list",
                    message:chalk.green("select Amount:"),
                    choices:[1000,2000,3000,5000,10000,20000,50000]
                }
            ])
            if(fastCashAns.fastCash > myBalance ){
                console.log(chalk.red("insufficient Balance"));

            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(chalk.green`${fastCashAns.fastCash} withdraw successfully`);
                console.log(chalk.red(`your remaining Balance is: ${myBalance }`));
            }
        }
       else if(withdrawAns.withdrawMethod === "Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Enter the amount to withdraw:"), 
                }
            ])
            if(amountAns.amount > myBalance){
            console.log ("insufficient Balance");
            }    
            else{
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount}  withdraw successfully`));
                console.log(chalk.red(`your Remaining Balance is: ${myBalance}`));
        
            } 
        }
    }    
    else if(operationAns.operation === "check Balance"){
        console.log(chalk.green(`your account Balance is: ${myBalance}`));
    }
}
else{
    console.log(chalk.red("pin is incorrect , Try Again."));
}