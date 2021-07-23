# Famly Code Assessment

## Setup

Run `yarn start`

## Notes and Design Decisions

I started with the template from `create-react-template --template redux-typescript` to get a basic structure with styles, tests, etc.

I tried to stick with React best practices, but I come from an Angular environment with less experience in React.

With a tiny project this size, redux is over-complicated, but I chose to use it because I felt it gave a more real-world example of a much more complex project.

Since all the data is returned at once, but it should be paged, I thought of a few different options:
1. Load the data from the API initially, then only show a subset of it at a time.
2. Call the API each time data is needed but act as though we only got the subset needed. 

I felt option 1 was unrealistic because in a real world scenario there could be a huge amount of data that would actually come with its own pagination/limits from the API and would be harder to "fix" later. Data would also get out of sync with the server if changes were made there in the meantime.

I chose option 2 because it will allow the component to be built in a more flexible way that doesn't need the entire dataset at once.

For that reason (the ambiguity of how the real system works) I implemented a very simple paging system with a next/prev button.

Another choice was in how to handle repeated clicks on a checkin button. In this case, the API appears to be idempotent so it doesn't do any harm to allow it so I left it. With a little more work, we could block repeated calls based on childId, which would save wasted API calls.

## Known Bugs

- clicking next/prev too fast allows going beyond page limits. Need to add either blocking, or an additional check.
- no error handling for failed API calls

## Interested in working for Famly?

Give us a chance to see your beautiful code! 🤩 

How to get started:
- Fork this repository
- Create a small application in React (or another agreed upon framework)
- Describe your design decisions and setup instructions in the README.md of the forked repository

The application should be able to do 3 things:
1. List children with some form of pagination/lazy-loading/infinite-scroll
2. Checkin a child
3. Checkout a child

There are no other requirements than that—don't worry about design or anything like that.

If you have any questions feel free to reach out to ckl@famly.co (Christian) or ab@famly.co (Adam) ☺️

## API Specification

Use this access token: `234ffdb8-0889-4be3-b096-97ab1679752c`

### Fetch some children from

The API does not support any limit or offset, so the pagination/lazy-loading/infinite-scroll will have to be done client-side only.

```
GET https://tryfamly.co/api/daycare/tablet/group
Arguments: {
	accessToken: <accessToken>,
	groupId: '11fc220c-ebba-4e55-9346-cd1eed714620',
	institutionId: 'fb6c8114-387e-4051-8cf7-4e388a77b673'
}
```

Example in cURL:

```bash
$ curl "https://tryfamly.co/api/daycare/tablet/group?accessToken=234ffdb8-0889-4be3-b096-97ab1679752c&groupId=11fc220c-ebba-4e55-9346-cd1eed714620&institutionId=fb6c8114-387e-4051-8cf7-4e388a77b673"
```

### Checkin child
```
POST https://tryfamly.co/api/v2/children/<childId>/checkins

Arguments: {
	accessToken: <accessToken>
	pickupTime: 16:00
}
```

Example in cURL:

```bash
$ curl \
  -d 'accessToken=234ffdb8-0889-4be3-b096-97ab1679752c&pickupTime=16:00' \
  https://tryfamly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkins
```

### Checkout child
```
POST https://tryfamly.co/api/v2/children/<childId>/checkout
Arguments: {
	accessToken: <accessToken>
}
```

Example in cURL:

```bash
$ curl \
  -d 'accessToken=234ffdb8-0889-4be3-b096-97ab1679752c' \
  https://tryfamly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkout
```
