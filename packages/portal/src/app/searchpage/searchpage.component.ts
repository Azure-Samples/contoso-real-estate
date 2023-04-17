import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
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
  imports: [CardListComponent, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
})
export class SearchpageComponent implements OnInit {
  searchForm!: FormGroup;
  isLoading = false;
  listings: Listing[] = [];

  constructor(
    private searchService: SearchService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.searchForm = new FormGroup({
      term: new FormControl('', Validators.minLength(4))
    });
  }

  onSubmit(): void {
    this.searchService.getResults(this.searchForm.value.term)
      .subscribe((data) => {
        const results: SearchResult = data.data;
        const listingsResults: CleanResults = results.listings;
        this.listings = listingsResults.data;
        this.searchForm.reset();
    });
  }

  ngOnDestroy(): void {
    this.searchForm.reset();
  }
}
