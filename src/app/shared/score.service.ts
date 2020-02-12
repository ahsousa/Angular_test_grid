import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  score$: Observable<string>;
  grid$: Observable<number>;
  private scoreSubject = new Subject<string>();
  private gridSubject = new Subject<number>();

  constructor() {
    this.score$ = this.scoreSubject.asObservable();
    this.grid$ = this.gridSubject.asObservable();
  }

  showScore(score) {
    console.log(score);
    this.scoreSubject.next(score);
  }

  showGridNumber(grid) {
    console.log(grid);
    this.gridSubject.next(grid);
  }
}
