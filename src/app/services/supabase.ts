import { Injectable, resource, signal } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../../environments/environment';
import { Subject, Test } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  selectedSubject = signal<number | null>(null)


  private async getSubjects() {
    const res = await this.supabase.from('subjects').select('*');
    return res.data as Subject[];
  }

  private async getTestsBySubjectId(subjectId: number) {
    const res = await this.supabase.from('tests').select('*').eq('subject_id', subjectId);
    return res.data as Test[];
  }


  subjects = resource({
    loader: () => this.getSubjects()
  });

  tests = resource({
  params: () => ({id: this.selectedSubject()}),
  loader: ({params}) => {
    const subjectId = params.id
    if(subjectId === null) {
      return Promise.resolve(null)
    }
    return this.getTestsBySubjectId(subjectId)
  },
});

  


  
}