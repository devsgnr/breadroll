---
title: breadroll v0.1
---

<small>Aug 19th, 2023</small>

---

- `Dataframe.head: Dataframe` returns the first five rows of the dataframe
- `Dataframe.labels: Array<string>` returns the labels of the dataframe
- `Dataframe.filter(key: string, filter: Condition, value: unknown)` - filters the rows in `Dataframe` and returns `Dataframe(dataframe)`
- `Dataframe.value` - exposes the `Dataframe`'s dataframe as `Array<ObjectType>`
- `Dataframe.count` - returns the count of rows in the dataframe or dataframe object
- `Dataframe.isNull` - returns all the rows that have some properties equal to `null`
- `Dataframe.notNull` - returns all the rows that have every property equal to `!null`
- `Dataframe.dtypes` - returns all the data types of all the columns in the dataframe