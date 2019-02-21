import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-single-control',
  template: `
    <div class="form-group">
      <label>{{ label }}</label>
      <input [type]="type" [pattern]="pattern" [placeholder]="placeholder" class="form-control" [formControl]="control" spellcheck="false">
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleControlComponent {
  @Input()
  control: AbstractControl;
  @Input()
  label: string;
  @Input()
  pattern: string;
  @Input()
  placeholder: string;
  @Input()
  type = 'text';
}
