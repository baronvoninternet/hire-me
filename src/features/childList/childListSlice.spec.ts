import childListReducer, {
  ChildListState,
  increment,
  decrement,
  incrementByAmount,
  Child,
  checkOutChild,
  checkInChild,
} from './childListSlice';

describe('childList reducer', () => {
  const initialState: ChildListState = {
    children: {
      data: [{
        checkedIn: false,
        childId: "1234",
        groupId: "12345",
        institutionId: "123456",
        name: {
          fullName: "1Test Child"
        },
      },
      {
        checkedIn: true,
        childId: "4321",
        groupId: "12345",
        institutionId: "123456",
        name: {
          fullName: "2Test Child"
        },
      }]
    },
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

  it('should handle checkIn', () => {
    const childId = "1234";
    const actual = childListReducer(initialState, checkInChild(childId));
    const child: Child = actual.children.data.find((child: Child) => child.childId === childId)!;
    expect(child.checkedIn).toEqual(true);
  });

  it('should handle checkOut', () => {
    const childId = "4321";
    const actual = childListReducer(initialState, checkOutChild(childId));
    const child: Child = actual.children.data.find((child: Child) => child.childId === childId)!;
    expect(child.checkedIn).toEqual(false);
  });
});
