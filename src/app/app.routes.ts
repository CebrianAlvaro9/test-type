import { Routes } from '@angular/router';
import { SubjectSelector } from './pages/subject-selector/subject-selector';
import { TestSimulator } from './pages/test-simulator/test-simulator';

export const routes: Routes = [
  {
    path: '',
    component: SubjectSelector,
  },
  {
    path: 'asignatura/:id',
    component: TestSimulator,
  },
  {
    path: '**',
    redirectTo: '',
    }
];
