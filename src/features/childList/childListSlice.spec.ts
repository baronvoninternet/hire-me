import childListReducer, {
  ChildListState,
  increment,
  decrement,
  incrementByAmount,
} from './childListSlice';

describe('childList reducer', () => {
  const initialState: ChildListState = {
    children: { data: [] },
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(childListReducer(undefined, { type: 'unknown' })).toEqual({
      children: { data: [] },
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = childListReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = childListReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = childListReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
