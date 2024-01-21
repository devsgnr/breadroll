---
title: .average
---

#### `Dataframe.average(...)`
Parameters

- `key: string` - this is the column key or label, if unsure of the labels, it can be retrived by running `Dataframe.labels`

This function returns the average of all the values of the specified column `number`

```typescript
const average: number = df.average("key");
```