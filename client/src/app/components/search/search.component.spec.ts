import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchInputChanged event on input change', fakeAsync(() => {
    const inputElement: DebugElement = fixture.debugElement.query(By.css('input'));
    const mockInputValue = 'search term';

    spyOn(component.searchInputChanged, 'emit');

    inputElement.nativeElement.value = mockInputValue;
    inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
    fixture.detectChanges();
    tick(1000);

    expect(component.searchInputChanged.emit).toHaveBeenCalledWith('mockInputValue');
  }));

  it('should debounce onChangeSearchText', fakeAsync(() => {
    const inputElement: DebugElement = fixture.debugElement.query(By.css('input'));
    const mockInputValue = 'search term';

    spyOn(component.searchInputChanged, 'emit');

    inputElement.nativeElement.value = mockInputValue;
    inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
    tick(1500);
    fixture.detectChanges();
    flush();

    expect(component.searchInputChanged.emit).not.toHaveBeenCalled();

    tick(600);
    fixture.detectChanges();
    flush();

    expect(component.searchInputChanged.emit).toHaveBeenCalledWith(mockInputValue);
  }));
});
