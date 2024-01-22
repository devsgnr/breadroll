---
title: .max
---

#### `Dataframe.max(...)`
Parameters

- `key: string` - this is the column key or label, if unsure of the labels, it can be retrived by running `Dataframe.labels`

This function returns the maximum value of all the values of the specified column `number`

```typescript
const max: number = df.max("key"); // number
```