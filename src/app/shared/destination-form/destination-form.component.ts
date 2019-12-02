import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Destination } from 'src/app/models/destination.model';
import { isFieldInvalid, hasError } from 'src/app/utils/form.helpers';

@Component({
  selector: 'app-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationFormComponent implements OnInit {
  @Input() destination: Destination;
  @Output() submitDestination = new EventEmitter<Destination>();

  formGroup: FormGroup;

  MIN_LENGTH_NAME = 3;
  MAX_LENGTH_NAME = 100;
  MIN_LENGTH_DESCRIPTION = 10;
  MAX_LENGTH_DESCRIPTION = 500;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.generateForm(this.destination);
  }

  submitHandler($event) {
    if (this.formGroup.valid) {
      this.submitDestination.emit(this.formGroup.value);
      // angular material issue: https://github.com/angular/components/issues/4190#issuecomment-496965737
      $event.currentTarget.reset();
      this.formGroup.reset();
    }
  }

  isFieldInvalid(field: string): boolean {
    return isFieldInvalid(this.formGroup, field);
  }

  hasError(field: string, error: string): boolean {
    return hasError(this.formGroup, field, error);
  }

  private generateForm(destination: Destination): FormGroup {
    return this.fb.group({
      name: [
        destination && destination.name,
        [Validators.required, Validators.minLength(this.MIN_LENGTH_NAME), Validators.maxLength(this.MAX_LENGTH_NAME)]
      ],
      description: [
        destination && destination.description,
        [Validators.required, Validators.minLength(this.MIN_LENGTH_DESCRIPTION), Validators.maxLength(this.MAX_LENGTH_DESCRIPTION)]
      ]
    });
  }

}
