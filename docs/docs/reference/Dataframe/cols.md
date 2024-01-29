---
title: .cols
---

#### `Dataframe.cols`
This function returns specific columns of the dataframe strictly using interger based indexing similar to panda's `iloc`, this function takes an object with either the start or the end index and return the dataframe with the specified columns

Parameter

- `Cols.start?: number` - if provided, specifies the begin, or else default to the first column in the dataframe
- `Cols.end?: number` - if provided, specifies the end, or else default to the last column in the dataframe

```typescript
const count: Dataframe = df.cols({ start: 0, end: 4 });
```

---

Let's say you want the dataframe to have all the columns except the last column of the dataframe, making the value of `end`, `-1` return the dataframe with the last column omitted, and intuitively, making the value of `end`, `-2` omits the lasts two columns and so on.

```typescript
const count: Dataframe = df.cols({ end: -1 });
```

!!! note

    Note providing the `start` and `end` value will by default return the entire columns of the dataframe

```typescript
const count: Dataframe = df.cols({});
```