import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { ScoreService } from './score.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnDestroy {

  score: string;
  subscription: Subscription;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.subscription = this.scoreService.score$.subscribe((score) => this.score = score);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
