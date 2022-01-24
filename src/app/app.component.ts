import { Component } from '@angular/core';
import {bootstrap} from 'bootstrap';

const bootstrap = require('bootstrap');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "my-credit-app"
  name = 'Jacqueline';

  // Credit Score
  creditScore = 735;
  maxScore = 850;
  creditRating = 'Good';

  //Credit factor object with initial values
  creditFactor = {
    utilization: 24,
    paymentHistory: 99,
    derogatoryMarks: 1,  
    creditHistory: 80,
    totalAccounts: 14,
    hardInquires: 1
  }

  //Credit Score Factors with randomly generated values
  randomNum = (maxNum)=> {
    return Math.floor(Math.random()*(maxNum+1));
  };
  creditFactors = [{detail:'Credit Card Utilization',title:this.creditFactor.utilization+"%"},{detail:'Payment History', title:this.creditFactor.paymentHistory+"%"}, {detail:'Derogatory Marks', title:this.creditFactor.derogatoryMarks},{detail:'Age of Credit History', title:this.creditFactor.creditHistory+" years"},{detail:'Total Accounts',title:this.creditFactor.totalAccounts}, {detail:'Hard Inquiries',title:this.creditFactor.hardInquires}];
    
//CREDIT API
  CREDIT_API = (detail, title) => {
    let data;
    if (detail !== "Age of Credit History") {
      data = parseInt(title);
    } else {
      let years = title.split(" ")[0];
      return years < 1 ? "bad" : years < 3 ? "avg" : "good";
    }
    if (detail === "Credit Card Utilization") {
      return data < 25 ? "good" : data > 50 ? "bad" : "avg";
    }
    if (detail === "Total Accounts") {
      return data > 8 ? "good" : data <= 3 ? "bad" : "avg";
    }
    if (detail === "Derogatory Marks") {
      return data < 2 ? "good" : data <= 5 ? "avg" : "bad";
    }
    if (detail === "Payment History") {
      return data > 80 ? "good" : data >= 60 ? "avg" : "bad";
    }
    if (detail === "Hard Inquiries") {
      return data < 2 ? "good" : data <= 5 ? "avg" : "bad";
    }
  };

features = [{featureTitle:'Credit Monitoring',featureText:"Get alerted to important changes to your reports."},{featureTitle:'Insights',featureText:"Learn what affects your scores and what you can do to improve them."},{featureTitle:'Better Decisions',featureText:"Get personalized recommendations for ways to use your credit more wisely."}]


 //Randomize Credit Score on Click
  onUpdateCredit(){

    //randomize Credit Score and update rating
    this.creditScore = Math.floor(Math.random()*this.maxScore+1);

    this.creditRating = this.creditScore >= 670 ? "Good": this.creditScore < 450 ? "Poor": "Fair";
    

    //randomize credit factor values
      this.creditFactor = {
        utilization: this.randomNum(100),
        paymentHistory: this.randomNum(100),
        derogatoryMarks: this.randomNum(10),  
        creditHistory: this.randomNum(10),
        totalAccounts: this.randomNum(15),
        hardInquires: this.randomNum(10)
      }
      this.creditFactors = [{detail:'Credit Card Utilization',title:this.creditFactor.utilization+"%"},{detail:'Payment History', title:this.creditFactor.paymentHistory+"%"}, {detail:'Derogatory Marks', title:this.creditFactor.derogatoryMarks},{detail:'Age of Credit History', title:this.creditFactor.creditHistory+" years"},{detail:'Total Accounts',title:this.creditFactor.totalAccounts}, {detail:'Hard Inquiries',title:this.creditFactor.hardInquires}];


    //Generate credit ratings for each credit factor
    for(var i = 0; i< this.creditFactors.length;i++){
      console.log(this.creditFactors[i].detail +" " + this.creditFactors[i].title);
      console.log(this.CREDIT_API(this.creditFactors[i].detail,this.creditFactors[i].title));
    }
    
    
    console.log(this.creditScore);
    console.log(this.creditRating);
    console.log("-----------------------------");
    
  }

//Generate colors based on credit rating good = green, fair = yellow, poor = red
  getColor(rating){
    return rating ==="Good" ? "#3DDB93": rating==="Fair" ? "#FFD22A": "#FC6565";
  }

}
