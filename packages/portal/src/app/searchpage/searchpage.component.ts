import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { GraphQLModule } from '../graphql.module';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchService } from '../shared/search/search.service';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, GraphQLModule],
  providers: [Apollo]
})
export class SearchpageComponent implements OnInit {
  searchForm!: FormGroup;
  searchTerm: FormControl = new FormControl();
  results?: Observable<unknown>;
  term = '';
  isLoading = false;

  constructor(
    private searchService: SearchService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('searchpage');

    this.searchForm = new FormGroup({
      term: new FormControl('', Validators.minLength(4))
    });
  }

  onSubmit(): void {
    console.log('submit');
    this.results = this.searchService.getResults(this.searchForm.value.term);
  }
}
