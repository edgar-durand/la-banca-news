import {BehaviorSubject, Observable, of} from "rxjs";
import {INews} from "../interfaces/INews";

export class NewsServiceMock {
  public news$: Observable<INews[]>;
  private _news$: BehaviorSubject<INews[]> = new BehaviorSubject<INews[]>([])

  constructor() {
    this.news$ = this._news$.asObservable();
  }

  public getNews(): Observable<INews[]> {
    return of([]);
  }

  public editNews(_id: number, _content: string) {
  }

  public deleteNews(_id: number) {
  }
}
