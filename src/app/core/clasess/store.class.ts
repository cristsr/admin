import { Observable, ReplaySubject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

export class Store<Action, State> extends ReplaySubject<Action> {
  readonly state$: Observable<State> = this.pipe(
    startWith(this.initialState),
    scan<Action, State>(this.reducer, this.initialState),
  );

  constructor(
    private initialState: State,
    private reducer: (state: State, action: Action) => State
  ) {
    super(1);
  }
}
