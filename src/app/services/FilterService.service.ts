import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  tagEmitter: Subject<string> = new Subject();

  onTagSelected(tag: string): void {
    this.tagEmitter.next(tag);
  }
}
