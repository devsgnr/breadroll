---
title: .min
---

#### `Dataframe.min(...)`
Parameters

- `key: string` - this is the column key or label, if unsure of the labels, it can be retrived by running `Dataframe.labels`

This function returns the minimum value of all the values of the specified column `number`, `key` is the labels in `Dataframe.labels`

```typescript
const min: number = df.min("key"); // number
```