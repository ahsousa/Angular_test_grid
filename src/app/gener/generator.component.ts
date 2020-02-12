import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ScoreService } from '../shared/score.service';
import * as moment from 'moment';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  data = [];
  firstClockValue: number;
  secondClockValue: number;
  score: string;
  letter: string;
  letterInserted = false;
  alphabet = 'abcdefghijklmnopqrstuvxyz';
  cols = [0,1,2,3,4,5,6,7];
  rows = [0,1,2,3,4,5,6,7];
  weightedProbability = [];
  numberOfGrid = 64;
  generatorStarted: boolean;


  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.score = '';
    this.generatorStarted = false;
  }

  showLetter() {
    this.letterInserted = true;

    setTimeout(() => {
      this.letter = '';
      this.letterInserted = false;
    }, 4000);
  }

  startGenerator(): void {
    this.generatorStarted = true;
    this.generateRandomWord(this.letter);

    setInterval(() => {
      this.generateRandomWord(this.letter);
      console.log(this.letter);
      this.getCurrentScore();
    }, 2000);
  }

  generateRandomWord(value?: string): void {
    this.data = [];

    if (value) {
      this.rows.forEach( r => {
        const row = [];
        this.cols.forEach(c => {
          const probability = Math.random();
          if (probability <= 0.2) {
            row.push(value);
          } else {
            const letterIndex = Math.floor(Math.random()  * this.alphabet.length);
            const letter = this.alphabet[letterIndex];
            row.push(letter);
          }
        });
        this.data.push(row);
      });
    } else {
      this.rows.forEach( r => {
        const row = [];
          this.cols.forEach(c => {
            const letterIndex = Math.floor(Math.random() * this.alphabet.length);
            const letter = this.alphabet[letterIndex];
            row.push(letter);
          });

          this.data.push(row);
      });
    }
  }

  getCurrentScore(): void {
    let counterFirstValue = 0;
    let counterSecondValue = 0;
    const finalScore = [];
    const position = [];
    const now = moment().format('ss');

    const positionInGrid = now.split('');
    console.log(positionInGrid);
    positionInGrid.forEach(l => {
      const number = parseInt(l);
      position.push(number);
    });

    let first = position[0];
    let second = position[1];

    if ( second > 7) {
      second = 7;
    }

    let third = position[1];

    if (third > 7) {
      third = 7;
    }
    let forth = position[0];


    const firstClockValue = this.data[first][second];
    console.log(firstClockValue);

    /// PROBLEMA RESIDE AQUI!!!
    const secondClockValue = this.data[third][forth];
    console.log(secondClockValue);
    /// search in data array for occurences
    this.data.forEach(row => {
      row.filter(letter => {
        // check first letter
        if (letter === firstClockValue) {
          counterFirstValue++;

          if (counterFirstValue > 9 ) {
            // multiplicado pelo valor mais baixo possivel que permita o valor
            // ficar <= 9
            const maxValue = 9;
            const remainder = counterFirstValue - maxValue;

            // counterFirstValue / x <= maxValue;
          }
        }

        // check second letter
        if (letter === secondClockValue) {
          counterSecondValue++;
          if (counterSecondValue > 9) {

          }
        }
      });
    });
    finalScore.push(counterFirstValue, counterSecondValue);
    this.score = finalScore.join('');
    this.scoreService.showScore(this.score);
     // get number of grids
     this.scoreService.showGridNumber(this.numberOfGrid);
  }
}
