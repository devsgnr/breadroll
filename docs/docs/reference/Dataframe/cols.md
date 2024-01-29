---
title: .cols
---

#### `Dataframe.cols`
This function returns columns strictly using interger based indexing similar to panda's `iloc`, this function takes an object with either the start or the end index and return the columns

Parameter

- `Cols.start?: number` - if provided, specifies the begin, or else default to the first column in the dataframe
- `Cols.end?: number` - if provided, specifies the end, or else default to the last column in the dataframe

```typescript
const count: Dataframe = df.cols({ start: 0, end: 4 });
```