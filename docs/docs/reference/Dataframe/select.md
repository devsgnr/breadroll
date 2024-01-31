---
title: .select
---

#### `Dataframe.select(...)`
Parameters

- `key: Array<string>` - this is an array of column key or label, if unsure of the labels, it can be retrived by running `Dataframe.labels`

This function return a new Dataframe with only the desired columns, ie. columns with the specified labels

```typescript
const selected: Dataframe = df.select(["job_title", "salary", "salary_currency", "salary_in_usd"]);
```