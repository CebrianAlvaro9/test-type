import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-subject-selector',
  imports: [],
  templateUrl: './subject-selector.html',
  styleUrl: './subject-selector.css',
})
export class SubjectSelector {
  private router = inject(Router);
  private supabaseService = inject(SupabaseService);
  subjects = this.supabaseService.subjects;

  navigateToTest(id: number) {
    this.router.navigate(['/asignatura', id]);
  }
}
