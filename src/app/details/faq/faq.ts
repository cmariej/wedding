import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import emailjs from '@emailjs/browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

interface QuestionItem {
  question: string;
  answer: string;
}

interface QuestionData {
  questions: QuestionItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [Message, InputText, Textarea, ReactiveFormsModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss'],
})
export class Faq {

  fb = inject(FormBuilder);
  contactForm: FormGroup;
  formSubmitted: boolean = false;
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;
  loading = false;
  questions: QuestionItem[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFaq();
  }

 loadFaq() {
  this.loading = true;

  setTimeout(() => {
    this.http
      .get<QuestionItem[]>(
        `${environment.apiUrl}/projects/Hochzeit/faq`
      )
      .subscribe({
        next: data => {

          this.questions = data;

          this.loading = false;
        },

        error: err => {
          console.error(err);

          this.loading = false;
        }
      });
  }, 500);
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