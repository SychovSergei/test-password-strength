import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EPasswordStrength } from "../../../shared/enums";
import { Subject, Subscription } from "rxjs";


@Component({
  selector: 'app-strength-indicator',
  templateUrl: './strength-indicator.component.html',
  styleUrls: ['./strength-indicator.component.scss']
})
export class StrengthIndicatorComponent implements OnChanges, OnInit, OnDestroy {

  @Input('status') status: EPasswordStrength = EPasswordStrength.EMPTY;

  private colorGroups = {
    'EMPTY' : ['grey','grey','grey'],
    'LESS' : ['red','red','red'],
    'EASY' : ['red','grey','grey'],
    'MEDIUM' : ['yellow','yellow','grey'],
    'STRONG' : ['green','green','green']
  }
  private colorsSubject: Subject<string[]> = new Subject<string[]>();
  private colorsSub!: Subscription;

  colors: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.colorsSubject.next(this.colorGroups[changes['status'].currentValue as EPasswordStrength]);
  }

  ngOnInit() {
    this.colors = this.colorGroups[this.status];
    this.colorsSub = this.colorsSubject.asObservable().subscribe((val) => {
      this.colors = val;
    });
  }

  ngOnDestroy() {
    if (this.colorsSub) {
      this.colorsSub.unsubscribe();
    }
  }
}
