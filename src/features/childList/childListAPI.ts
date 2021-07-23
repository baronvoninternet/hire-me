import axios from "axios";
import { Child, PagedData } from "./childListSlice";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}


// This is written to simulate calling an API that supports pagination.
// Ideally, I would have some sort of data service layer that makes these calls if it were more complex.
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