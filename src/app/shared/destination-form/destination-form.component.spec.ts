import { DestinationFormComponent } from './destination-form.component';
import { FormBuilder } from '@angular/forms';

describe('DestinationFormComponent', () => {
  let comp: DestinationFormComponent;

  beforeEach(() => {
    comp = new DestinationFormComponent(new FormBuilder());
  });

  it('submitHandler shoud do nothing if the form is invalid', () => {
    spyOn(comp.submitDestination, 'emit');

    const event = {
      currentTarget: {
        reset: () => {}
      }
    };

    comp.ngOnInit();

    comp.submitHandler(event);

    expect(comp.submitDestination.emit).not.toHaveBeenCalled();
  });

  it('submitHandler should emit the form value', () => {
    spyOn(comp.submitDestination, 'emit');

    comp.destination = {
      uuid: '1',
      name: 'Hawai',
      description: 'Beautiful place'
    };

    const event = {
      currentTarget: {
        reset: () => {}
      }
    };

    comp.ngOnInit();

    comp.submitHandler(event);

    const expectedFormValue = {
      name: 'Hawai',
      description: 'Beautiful place'
    };

    expect(comp.submitDestination.emit).toHaveBeenCalledWith(expectedFormValue);
  });

  it('submitHandler should reset the form after submit', () => {

    const event = {
      currentTarget: {
        reset: () => {}
      }
    };

    comp.ngOnInit();

    spyOn(comp.formGroup, 'reset');

    comp.formGroup.setValue({
      name: 'Hawai',
      description: 'Beautiful place'
    });

    comp.submitHandler(event);

    expect(comp.formGroup.reset).toHaveBeenCalled();
  });

  it('isFieldInvalid should say if a field is invalid', () => {
    comp.ngOnInit();

    comp.formGroup.get('name').markAsTouched();
    comp.formGroup.get('description').markAsTouched();

    comp.formGroup.setValue({
      name: '',
      description: ''
    });

    expect(comp.isFieldInvalid('name')).toBe(true);
    expect(comp.hasError('name', 'required')).toBe(true);
    expect(comp.isFieldInvalid('description')).toBe(true);
    expect(comp.hasError('description', 'required')).toBe(true);

    comp.formGroup.setValue({
      name: 'd',
      description: 'asdasd'
    });

    expect(comp.isFieldInvalid('name')).toBe(true);
    expect(comp.hasError('name', 'minlength')).toBe(true);
    expect(comp.isFieldInvalid('description')).toBe(true);
    expect(comp.hasError('description', 'minlength')).toBe(true);

    comp.formGroup.setValue({
      name: 'dsss',
      description: 'sdasdasdssssss asdasd asd'
    });

    expect(comp.isFieldInvalid('name')).toBe(false);
    expect(comp.isFieldInvalid('description')).toBe(false);

    comp.formGroup.setValue({
      name: Array(102).join('x'),
      description: Array(502).join('x'),
    });

    expect(comp.isFieldInvalid('name')).toBe(true);
    expect(comp.hasError('name', 'maxlength')).toBe(true);
    expect(comp.isFieldInvalid('description')).toBe(true);
    expect(comp.hasError('description', 'maxlength')).toBe(true);
  });
});
