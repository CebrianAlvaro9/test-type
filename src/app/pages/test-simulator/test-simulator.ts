import { Component, computed, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-simulator',
  imports: [],
  templateUrl: './test-simulator.html',
  styleUrl: './test-simulator.css',
})
export class TestSimulator {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  test = this.supabaseService.tests;

  id = input.required<string>();

  testType = signal<string | null>(null);

  testTypeOptions = [
    { label: 'Exámenes anteriores', value: 'exam' },
    { label: 'Moodle', value: 'moodle' },
    { label: 'Mixto', value: 'mixto' },
  ];

  filteredTests = linkedSignal(() => {
    const type = this.testType();
    const test = this.test.value() ?? [];

    if (type === 'exam') {
      return test.filter((t) => t.type_exam);
    }

    if (type === 'moodle') {
      return test.filter((t) => !t.type_exam);
    }

    return test;
  });

  questionNumber = signal(0);

  questionSelected = computed(() => this.filteredTests()[this.questionNumber()]);

  userAnswers = signal<{ id: number; answer: number }[]>([]);

  selectAnswer(testId: number, answerIndex: number) {
    this.userAnswers.update((answers) => {
      const index = answers.findIndex((a) => a.id === testId);
      if (index !== -1) {
        // Update existing answer
        const newAnswers = [...answers];
        newAnswers[index] = { id: testId, answer: answerIndex };
        return newAnswers;
      } else {
        // Add new answer
        return [...answers, { id: testId, answer: answerIndex }];
      }
    });
  }

  
  currentQuestionAnswer = computed(() => {
    return this.userAnswers().find((a) => a.id === this.questionSelected().id)?.answer;
  });

  correctQuestionsCount = computed(() => {
    const answers = this.userAnswers();
    const tests = this.filteredTests();
    let correctCount = 0;

    answers.forEach((userAns) => {
      const test = tests.find((t) => t.id === userAns.id);
      if (test && test.query.correct === userAns.answer) {
        correctCount++;
      }
    });

    return correctCount;
  });

  successPercentage = computed(() => {
    const answers = this.userAnswers();
    if (answers.length === 0) return 0;
    
    return Math.round((this.correctQuestionsCount() / answers.length) * 100);
  });

  ngOnInit() {
    const id = this.id();
    this.supabaseService.selectedSubject.set(Number(id));
  }

  constructor() {
    effect(() => {
      const tests = this.test.value();
      if (tests !== undefined && tests !== null) {
        if (tests.length === 0) {
          this.router.navigate(['']);
        }
      }
    });
  }

  goBack() {
    if (this.testType()) {
      this.testType.set(null);
      this.questionNumber.set(0);
      this.userAnswers.set([]);
    } else {
      this.router.navigate(['/']);
    }
  }

  repetirErroneas() {
    this.questionNumber.set(0);
    this.filteredTests.set(this.filteredTests().filter((t) => t.query.correct !== this.currentQuestionAnswer()));
    this.userAnswers.set([]);
  }
}
