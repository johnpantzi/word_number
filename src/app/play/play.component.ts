import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InteropObservable, interval } from 'rxjs';
import * as internal from 'stream';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  public words: Array<string>;
  public cards: Array<Card>;
  public firstColor: string;
  public secondColor: string;
  public mainCardTurned: boolean;
  public timeLeft: number;
  public timeStart: number;
  public intervalTimer: any;

  constructor(private route: ActivatedRoute) { 
    this.words = [];
    this.cards = [];
    this.mainCardTurned = false;
    this.timeLeft = 60;
    this.timeStart = 60;
    
    this.readTextFile();
    let random = Math.floor(Math.random() * 2);
    if(random == 1){//red team starts

      this.firstColor = "#dd1c08"
      this.secondColor = "#00cfff"
    
    }else{//blue team starts
    
      this.firstColor = "#00cfff"
      this.secondColor = "#dd1c08"
    
    }

    this.createCards(this.firstColor, this.secondColor);

  }

  createCards(firstColor:string, secondColor:string){

    let numbers: Array<number> = [];

    let random;
    for(let i = 0; i < 9; i++){
      random = Math.floor(Math.random() * this.words.length);
      if(random in numbers) {
        i--;
        continue;
      }
      numbers.push(random);
      this.cards.push(new Card(this.words[random], firstColor, "team1", true));
    }

    for(let i = 0; i < 8; i++){
      random = Math.floor(Math.random() * this.words.length);
      if(random in numbers) {
        i--;
        continue;
      }
      numbers.push(random);
      this.cards.push(new Card(this.words[random], secondColor, "team2", true));
    }

    for(let i = 0; i < 7; i++){
      random = Math.floor(Math.random() * this.words.length);
      if(random in numbers) {
        i--;
        continue;
      }
      numbers.push(random);
      this.cards.push(new Card(this.words[random], "#ffff60", "pass", true));
    }

    for(let i = 0; i < 1; i++){
      random = Math.floor(Math.random() * this.words.length);
      if(random in numbers) {
        i--;
        continue;
      }
      numbers.push(random);
      this.cards.push(new Card(this.words[random], "#1a1717", "killer", true));
    }

    this.shuffle(this.cards);

  }

  readTextFile(){
    var rawFile = new XMLHttpRequest();
    var allText = '';
    rawFile.open("GET", "../assets/words.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    this.words = allText.split('\n');
  }
  
  shuffle(array:Array<Card>) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

      return array;
  }

  turnCard(card:Card){
    console.log("hello");
    card.turned = !card.turned;
  }

  turnMainCard(){
    this.mainCardTurned = !this.mainCardTurned;
  }
  
  ngOnInit(): void {}

  startTimer(){
    this.intervalTimer = setInterval(() => {
      if(this.timeLeft > 0){
        this.timeLeft--;
      }
      else{
        this.timeLeft = this.timeStart;
      }
    },1000)
  }

  pauseTimer(){
    clearInterval(this.intervalTimer);
  }

  resetTimer(){
    this.pauseTimer();
    this.timeLeft = this.timeStart;
  }

  setTimer(newTimer: string){
    this.pauseTimer();
    this.timeStart = Number(newTimer);
    this.timeLeft = this.timeStart;
  }

}

export class Card {
  constructor(public word: string, public color: string, public category: string, public turned: boolean) {}
 }
