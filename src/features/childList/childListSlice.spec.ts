import childListReducer, {
  ChildListState,
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
  };

  it('should handle initial state', () => {
    expect(childListReducer(undefined, { type: 'unknown' })).toEqual({
      children: { data: [] },
    });
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
