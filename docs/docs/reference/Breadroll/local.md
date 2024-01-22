---
title: .open.local
---
#### `Breadroll.open.local(...)`
This function opens the local data source, ie. the file on disk and return a Dataframe

Parameter

- `filepath: string` - the location of the file.

```typescript
const file: Breadroll = new Breadroll({ header: true, delimiter: "," });
const df: Dataframe = await file.open.local("./test/data/adult.data");
const filtered = df.filter("workclass", "equals", "Private").count;
```