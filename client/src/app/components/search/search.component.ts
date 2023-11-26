import { Component, EventEmitter, Output } from '@angular/core';
import debounce  from 'lodash.debounce';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  searchInput: string = '';
  @Output() searchInputChanged = new EventEmitter<string>();

  public onChangeSearchText = debounce((event) => {
    this.searchInput = event.target.value;
    this.searchInputChanged.emit(this.searchInput);
  },1000);
}
