import { Component, inject } from '@angular/core';
import data from './questions.json';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import emailjs from '@emailjs/browser';

interface Question {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  imports: [Message, InputText, Textarea, ReactiveFormsModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  questions: Question[] = data.questions;

  fb = inject(FormBuilder);
  contactForm: FormGroup;
  formSubmitted: boolean = false;
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      emailjs.send(
        'service_39zvsce',
        'template_mpis3q8',
        {
          name: this.contactForm.value.name,
          question: this.contactForm.value.message,
        },
        'N2VyJjNZ-6ixZ6vHf'
      ).then(() => {
        this.submitSuccess = true;
        this.contactForm.reset();
        this.formSubmitted = false;
        this.isSubmitting = false;
      }).catch(() => {
        this.isSubmitting = false;
      });
    }
  }

  isInvalid(controlName: string) {
    const control = this.contactForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}


// https://dashboard.emailjs.com/admin
// templateID: template_mpis3q8
// serviceID: service_39zvsce
// publicKey: N2VyJjNZ-6ixZ6vHf