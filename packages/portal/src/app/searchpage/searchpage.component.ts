import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SearchService } from '../shared/search/search.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule]
})
export class SearchpageComponent implements OnInit {
  searchForm!: FormGroup;
  searchTerm: FormControl = new FormControl();
  results?: Observable<any>;
  term = '';
  isLoading = false;

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('searchpage');

    this.searchForm = new FormGroup({
      term: new FormControl('', Validators.minLength(2))
    });
  }

  onSubmit(): void {
    console.log('submit');
    this.results = this.searchService.getResults(this.searchForm.value.term);
  }
}
