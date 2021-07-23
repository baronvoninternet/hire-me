import axios from "axios";
import { Child, ChildId, PagedData } from "./childListSlice";

// This whole file could be simplified by adding a data service that handles API calls for us

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

// This is written to simulate calling an API that supports pagination.
// Since we do have all the data, it could easily be cached so it doesn't all have to be retrieved each page.
export async function fetchChildren(page: number = 1, perPage: number = 10): Promise<PagedData<Child>> {
  const params = {
    // I assume accessToken would realistically be in the state after authorization, or at least in an
    // env file, but for this simple example we can put it here.
    accessToken: '234ffdb8-0889-4be3-b096-97ab1679752c',

    // I assume that groupId and institutionId would work better as parameters to fetchChildren
    // (or the previously mentioned data service) but without knowing how they're used for now
    // I they can be hardcoded here.
    groupId: '11fc220c-ebba-4e55-9346-cd1eed714620',
    institutionId: 'fb6c8114-387e-4051-8cf7-4e388a77b673'
  };

  // URI would ideally not be used here, and instead be handled by the data service, API wrapper, or env
  const res = await axios.get('https://tryfamly.co/api/daycare/tablet/group', { params: params });

  const allChildren: Child[] = res.data.children;

  const startPos: number = (page - 1) * perPage;
  const endPos: number = startPos + perPage;
  const hasMore: boolean = endPos < allChildren.length;
  const pagedChildren: Child[] = allChildren.slice(startPos, endPos);

  const ret = {
    data: pagedChildren,
    page: page,
    perPage: perPage,
    hasMore: hasMore
  }

  return ret;

}

export type CheckInChildAPIParams = {
  accessToken: string,
  pickupTime: string, // Not sure if this should be Date, require a "XX:XX" format, etc.
}
export type CheckInChildAPIResult = {
  childId: ChildId,
  success: boolean,
}
export type CheckOutChildAPIParams = {
  accessToken: string,
}
export type CheckOutChildAPIResult = {
  childId: ChildId,
  success: boolean,
}

export async function checkInChildAPI(childId: ChildId): Promise<CheckInChildAPIResult> {
  // Actual error handling would be better but this works fine in this case
  if (!childId || childId.length === 0) return { childId: childId, success: false };

  const now = new Date();
  const params: CheckInChildAPIParams = {
    accessToken: '234ffdb8-0889-4be3-b096-97ab1679752c',
    pickupTime: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })
  };

  // URI would ideally not be used here, and instead be handled by the data service, API wrapper, or env
  const res = await axios.post(`https://tryfamly.co/api/v2/children/${childId}/checkins`, params);

  const ret = {
    childId: childId,
    success: res && res.status === 200,
  }

  return ret;
}
export async function checkOutChildAPI(childId: ChildId): Promise<CheckInChildAPIResult> {
  // Actual error handling would be better but this works fine in this case
  if (!childId || childId.length === 0) return { childId: childId, success: false };

  const now = new Date();
  const params: CheckOutChildAPIParams = {
    accessToken: '234ffdb8-0889-4be3-b096-97ab1679752c',
  };

  // URI would ideally not be used here, and instead be handled by the data service, API wrapper, or env
  const res = await axios.post(`https://tryfamly.co/api/v2/children/${childId}/checkout`, params);

  const ret = {
    childId: childId,
    success: res && res.status === 200,
  }

  return ret;
}