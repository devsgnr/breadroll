---
title: .filter
---

#### `Dataframe.filter(key: string, filter: Condition, value: unknown, limit?: unknown)`
This function returns `Dataframe` and it is used to filter out `Dataframe`, by checking if `key` which is the column label against a filter condition `Condition` using `value`.

#### `Condtion`
This is a `Union` type that sets the available filters, given by: `"equal to" | "not equal to" | "contains" | "greater than" | "less than" | "greater than or equal to" | "less than or equal to" | "is between"`

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

#### Range Filters
Range filters filter numerical values in the Dataframe that fall between a certain range (lower limit and upper limit);

```typescript
const filtered: Dataframe = df.filter("salary", "in between", 70000, 100000); // Dataframe
```