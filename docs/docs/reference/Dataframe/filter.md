---
title: .filter
---

#### `Dataframe.filter(...)`
Parameters

- `key: string` - this is the column key or label, if unsure of the labels, it can be retrived by running `Dataframe.labels`
- `filter: Condition` - is a `enum` type that has the available filters (1) 
    { .annotate }
   
    1. `"==" | "!=" | "E" | "matches" | ">" | "<" | ">=" | "<=" | "is between"`. The `"E"` stands for; "is an element of" or "contains" usually used with `string`

- `value: unknown` - this can be a number of data types, this is determined based on the type of filter query
- `limit?: unknown` - this is an optional argument, used with range filters like `in between`

This function returns `Dataframe` and it is used to filter out `Dataframe`, by checking if `key` which is the column label against a filter condition `Condition` using `value`.

```typescript
const filtered: Dataframe = df.filter("salary", ">", 70000);
```

#### Multiple / Chained Filter
You can chain the filter ie. filtering the previously filtered `Dataframe`, the chained filter can be as long as you need them to be;

```typescript
const filtered: Dataframe = df.filter("salary", ">", 70000)
                              .filter("work_year", "==", 2020);
```

#### Range Filters
Range filters filter numerical values in the Dataframe that fall between a certain range (lower limit and upper limit);

```typescript
const filtered: Dataframe = df.filter("salary", "in between", 70000, 100000);
```

#### Regex Filter
Regex filter uses regular expression to perform complex queries like matching certain patterns in a `String`, this uses the `matches` keyword and takes in a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) as the value for the `value` paramter of the `.filter(...)` function.

???+ danger

    Please using this Regex filter is a big trade off on time, performing a query with a simple regex like `/engineer/i` on a dataset of almost 35,000+ rows take `~7.9ms` to `~10ms`, and performing a query with a regex like `/(a*)*b/` on the same dataset can take `~100ms`, as we see a `asymptotic` time complexity, it searches `n` characters of `n` rows, ie. time grows with growth in search space. We recommend you use `"contains"` or `"equals"`, and only use the RegEx when time is not a factor.

There are two ways to work with the "matches" regex filter

```typescript
// Create the RegExp object
const iRe = new RegExp(/engineer/, "i");
const filtered = selected_cols.filter("job_title", "matches", iRe);

// or pass the expression directly
const filtered = selected_cols.filter("job_title", "matches", /engineer/i);
```