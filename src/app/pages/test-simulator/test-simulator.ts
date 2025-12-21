import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase';
import { Router } from '@angular/router';
import { TestSelector } from './components/test-selector/test-selector';
import { TestSolver } from './components/test-solver/test-solver';

@Component({
  selector: 'app-test-simulator',
  imports: [TestSelector, TestSolver],
  templateUrl: './test-simulator.html',
})
export class TestSimulator {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  test = computed(() => this.supabaseService.tests.value() ?? []);
  testsLoading = computed(() => this.supabaseService.tests.isLoading());
  id = input.required<string>();
  testType = signal<string | null>(null);

  ngOnInit() {
    const id = this.id();
    this.supabaseService.selectedSubject.set(Number(id));
  }

  constructor() {
    effect(() => {
      const tests = this.supabaseService.tests.value();
      if (tests !== undefined && tests !== null) {
        if (tests.length === 0) {
          this.router.navigate(['']);
        }
      }
    });
  }
}
