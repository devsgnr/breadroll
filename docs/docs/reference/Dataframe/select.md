---
title: .select
---

#### `Dataframe.select(keys: Array<string>): Dataframe`
This function return a new Dataframe with only the desired rows, ie. rows with the specified labels

```typescript
const selected: Dataframe = df.select(["job_title", "salary", "salary_currency", "salary_in_usd"]); // return Dataframe
```