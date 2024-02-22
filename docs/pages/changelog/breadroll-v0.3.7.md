---
title: v0.3.7-alpha
---

<small>January 31st, 2024</small>

---

In breadroll's new version **0.3.7-alpha** two new features are introduced, Here are the cool new features

- Regex filter using `"matches"` keyword
- Integer-based indexing / selection



Regex filter
---

Introducing Regex filter with the keyword `"matches"` for performing complex queries like matching certain patterns in a `String`, this uses the `matches` keyword and takes in a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp). We recommend using this filter when a trade off on time is acceptable, see [here](/reference/Dataframe/filter/#regex-filter) for a more detailed explanation.
```typescript
const filtered = selected_cols.filter("job_title", "matches", /engineer/i);
```

Integer-based indexing / selection
---

`Dataframe.rows({start?: number, end?: number}: Indexer): Dataframe` Returns a specific number of rows of the dataframe, this function takes an object with either the start or the end index and return the dataframe with the specified number of rows - check it out [here](/reference/Dataframe/rows/)
```typescript
const count: Dataframe = df.rows({ start: 0, end: 4 });
```

`Dataframe.cols({start?: number, end?: number}: Indexer): Dataframe` Returns specific columns of the dataframe strictly using interger based indexing similar to panda's `iloc` - check it out [here](/reference/Dataframe/cols/)
```typescript
const count: Dataframe = df.cols({ start: 0, end: 4 });
```
