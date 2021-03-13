import { Component } from '@angular/core';
import { MultiSelectFbroComponent } from 'multi-select-fbro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  countries = [
    {
      "label" : "India",
      "value" : "IN"
    },
    {
      "label" : "France",
      "value" : "FR"
    },
    {
      "label" : "Germany",
      "value" : "GR"
    }
  ];
  title = 'multiSelectDropdown';

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event : any){
    console.log(event.value)
  }
}
