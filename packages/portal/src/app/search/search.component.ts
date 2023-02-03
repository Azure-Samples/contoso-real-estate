import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  searchTerm: FormControl = new FormControl();
  term = '';

  onSubmit(): void {
    // test the value you get from the input
    console.log(this.searchForm.value, 'search for this!');
    this.searchForm.reset();
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      term: new FormControl('', Validators.minLength(2))
    });
  }

}
