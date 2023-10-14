<template>
    <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume Martin Feineis</title>
  </head>

  <body>
    <div>
      <form>
        <label for="original-mortgage">Original Mortgage:</label>
        <input type="text" id="original-mortgage" name="original-mortgage"><br><br>
  
        <label for="interest-rate">Interest Rate:</label>
        <input type="text" id="interest-rate" name="interest-rate"><br><br>
  
        <label for="remaining-payments">Remaining Payments:</label>
        <input type="text" id="remaining-payments" name="remaining-payments"><br><br>
  
        <label for="current-balance">Current Balance:</label>
        <input type="text" id="current-balance" name="current-balance"><br><br>
  
        <button class="btn btn-primary" type="submit" @click.prevent="calculateMortgageBalance">Calculate</button>
      </form>
  
      <table v-if="mortgageBalance.length">
        <thead>
          <tr>
            <th>Month</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(balance, index) in mortgageBalance" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ balance }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>

</html>
  </template>
  
  <script>
  export default {
    data() {
      return {
        originalMortgage: null,
        interestRate: null,
        remainingPayments: null,
        currentBalance: null,
        mortgageBalance: [],
      };
    },
    methods: {
      calculateMortgageBalance() {
        const { originalMortgage, interestRate, remainingPayments, currentBalance } = this;
        let balance = parseFloat(currentBalance);
        let monthlyInterestRate = parseFloat(interestRate) / 12;
        let totalPayments = parseFloat(remainingPayments);
  
        let monthlyPayment =
          (monthlyInterestRate * balance) /
          (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
  
        console.log("Here comes the data: ", this.currentBalance, interestRate) 
        for (let i = 0; i <= totalPayments; i++) {
          let interestPaid = balance * monthlyInterestRate;
          let principalPaid = monthlyPayment - interestPaid;
          balance -= principalPaid;
          this.mortgageBalance.push(balance.toFixed(2));
        }
      },
    },
  };
  </script>
  
