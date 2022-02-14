import { Observable, ReplaySubject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

export class Store<Action, State> extends ReplaySubject<Action> {
  constructor(
    private initialState: State,
    private reducer: (state: State, action: Action) => State,
  ) {
    super(1);
  }

  get state$(): Observable<State> {
    return this.pipe(
      startWith<Action, State>(this.initialState),
      scan<Action, State>(this.reducer, this.initialState),
    );
  }
}
