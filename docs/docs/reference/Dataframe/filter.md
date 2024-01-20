---
title: .filter
---

#### `Dataframe.filter(key: string, filter: Condition, value: unknown, limit?: unknown)`
This function returns `Dataframe` and it is used to filter out `Dataframe`, by checking if `key` which is the column label against a filter condition `Condition` using `value`.

!!! note 
    
    `limit` is an optional fourth argument that is used with range filters like `in between`

```typescript
const filtered: Dataframe = df.filter("salary", "greater than", 70000); // Dataframe
```

#### Multiple / Chained Filter
You can chain the filter ie. filtering the previously filtered `Dataframe`, the chained filter can be as long as you need them to be;

```typescript
const filtered: Dataframe = df.filter("salary", "greater than", 70000)
                              .filter("work_year", "equals", 2020); // Dataframe
```