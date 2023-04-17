import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../shared/search/search.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
})
export class SearchpageComponent implements OnInit {
  searchForm!: FormGroup;
  isLoading = false;

  constructor(
    private searchService: SearchService,
  ) {}

  async ngOnInit(): Promise<void> {

    console.log('searchpage');

    this.searchForm = new FormGroup({
      term: new FormControl('', Validators.minLength(4))
    });
  }

  onSubmit(): void {
    console.log('term', this.searchForm.value.term);
    this.searchService.getResults(this.searchForm.value.term).subscribe((data) => {
      console.log('data', data);
    });
  }
}
