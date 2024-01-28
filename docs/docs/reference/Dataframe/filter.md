---
title: .filter
---

#### `Dataframe.filter(...)`
Parameters

- `key: string` - this is the column key or label, if unsure of the labels, it can be retrived by running `Dataframe.labels`
- `filter: Condition` - is a `enum` type that has the available filters (1) 
    { .annotate }
   
    1. `"equal to" | "not equal to" | "contains" | "greater than" | "less than" | "greater than or equal to" | "less than or equal to" | "is between"`

- `value: unknown` - this can be a number of data types, this is determined based on the type of filter query
- `limit?: unknown` - this is an optional argument, used with range filters like `in between`

This function returns `Dataframe` and it is used to filter out `Dataframe`, by checking if `key` which is the column label against a filter condition `Condition` using `value`.

```typescript
const filtered: Dataframe = df.filter("salary", "greater than", 70000);
```

#### Multiple / Chained Filter
You can chain the filter ie. filtering the previously filtered `Dataframe`, the chained filter can be as long as you need them to be;

```typescript
const filtered: Dataframe = df.filter("salary", "greater than", 70000)
                              .filter("work_year", "equals", 2020);
```

#### Range Filters
Range filters filter numerical values in the Dataframe that fall between a certain range (lower limit and upper limit);

```typescript
const filtered: Dataframe = df.filter("salary", "in between", 70000, 100000);
```