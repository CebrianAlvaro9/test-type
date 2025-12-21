import { Component, computed, input, linkedSignal, output, signal } from '@angular/core';
import { Test } from '../../../../models/models';

@Component({
  selector: 'test-solver',
  imports: [],
  templateUrl: './test-solver.html',
})
export class TestSolver {
  testType = input.required<string>();
  test = input.required<Test[]>();
  typeReset = output<void>();

  questionNumber = signal(0);

  questionSelected = computed(() => this.filteredTests()[this.questionNumber()]);

  userAnswers = signal<{ id: number; answer: number }[]>([]);

  currentQuestionAnswer = computed(() => {
    return this.userAnswers().find((a) => a.id === this.questionSelected().id)?.answer;
  });

  filteredTests = linkedSignal(() => {
    const type = this.testType();
    const tests = this.test() ?? [];

    const filtered =
      type === 'exam'
        ? tests.filter((t) => t.type_exam)
        : type === 'moodle'
        ? tests.filter((t) => !t.type_exam)
        : tests;

    return [...filtered].sort(() => Math.random() - 0.5);
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

  goBack() {
    this.typeReset.emit();
  }

  repetirErroneas() {
    this.questionNumber.set(0);
    this.filteredTests.set(
      this.filteredTests().filter((t) => t.query.correct !== this.currentQuestionAnswer())
    );
    this.userAnswers.set([]);
  }
}
