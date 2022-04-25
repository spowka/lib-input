import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-lib-input',
  templateUrl: './lib-input.component.html',
  styleUrls: ['./lib-input.component.scss']
})
export class LibInputComponent implements OnInit {
  public form: FormControl;

  @Output() valueChanged: EventEmitter = new EventEmitter();

  private unsubscribe$: Subject<void> = new Subject();
  constructor(private fb: FormBuilder) {
    this.form = this.fb.control('');
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((c: string) => {
      this.valueChanged.emit(c);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
