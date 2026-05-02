import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-rsvp',
  imports: [ReactiveFormsModule],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.scss',
})
export class Rsvp implements OnInit {
  fb = inject(FormBuilder);
  formSubmitted = false;
  isSubmitting = false;
  submitSuccess = false;

  form: FormGroup = this.fb.group({
    attending: [null, Validators.required],
    name: ['', Validators.required],
    guests: ['1'],
    food: [''],
    dog: [null],
    message: [''],
  });

  isInvalid(field: string) {
    const c = this.form.get(field);
    return c?.invalid && (c.touched || this.formSubmitted);
  }

  ngOnInit(): void {
    this.form.get('attending')?.valueChanges.subscribe(value => {
      const guests = this.form.get('guests');
      const dog = this.form.get('dog');
      const food = this.form.get('food');
      const message = this.form.get('message');

      if (value === 'yes') {
        guests?.setValidators(Validators.required);
        dog?.setValidators(Validators.required);
      } else {
        guests?.clearValidators();
        dog?.clearValidators();
      }

      guests?.updateValueAndValidity();
      dog?.updateValueAndValidity();
      food?.updateValueAndValidity();
      message?.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.invalid) return;

    this.isSubmitting = true;
    emailjs.send(
      'service_39zvsce',
      'template_mpis3q8',
      {
        attending: this.form.value.attending === 'yes' ? 'Ja' : 'Leider nicht',
        name: this.form.value.name,
        guests: this.form.value.guests,
        food: this.form.value.food || ' -',
        dog: this.form.value.dog === 'yes' ? 'Ja' : 'Nein',
        message: this.form.value.message || ' -',
      },
      'N2VyJjNZ-6ixZ6vHf'
    ).then(() => {
      this.submitSuccess = true;
      this.form.reset();
      this.formSubmitted = false;
      this.isSubmitting = false;
    }).catch(() => {
      this.isSubmitting = false;
    });
  }
}