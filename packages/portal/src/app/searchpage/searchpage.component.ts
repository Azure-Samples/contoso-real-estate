import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from '../shared/card-list/card-list.component';
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
  imports: [CommonModule, CardListComponent, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
})
export class SearchpageComponent implements OnInit {
  searchForm!: FormGroup;
  isLoading = false;
  listings: Listing[] = [];
  noresults = false;
  noresultsMessage = "The search returned 0 results. Please, try again...";
  seatrchTermInvalid = false;
  searchTermInvalidMessage = "The search term must be at least 4 characters long. Please, try again...";

  constructor(
    private searchService: SearchService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.searchForm = new FormGroup({
      term: new FormControl('', [
        Validators.minLength(4),
        Validators.pattern(/^[a-zA-Z0-9 ]*$/),
        Validators.maxLength(50),
      ]),
    });
  }

  onSubmit(): void {
    this.noresults = false;
    this.seatrchTermInvalid = false;
    console.log(this.searchForm.value, 'this.searchForm.value');
    if (this.searchForm.value.term === "" || this.searchForm.invalid) {
      this.seatrchTermInvalid = true;
      return;
    }
    this.searchService.getResults(this.searchForm.value.term)
      .subscribe((data) => {
        const results: SearchResult = data.data;
        const listingsResults: CleanResults = results.listings;
        this.listings = listingsResults.data;
        if (this.listings.length === 0 && this.searchForm.get('term')?.dirty) {
          this.noresults = true;
        }
        this.searchForm.reset();
    });
  }

  ngOnDestroy(): void {
    this.searchForm.reset();
  }
}
