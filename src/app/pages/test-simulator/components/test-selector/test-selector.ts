import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'test-selector',
  imports: [RouterLink],
  templateUrl: './test-selector.html',
})
export class TestSelector {

  typeChange = output<string>();

  testTypeOptions = [
    { label: 'Exámenes anteriores', value: 'exam' },
    { label: 'Moodle', value: 'moodle' },
    { label: 'Mixto', value: 'mixto' },
  ];

  setType(type: string) {
    this.typeChange.emit(type);
  }

}
