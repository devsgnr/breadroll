---
title: .open.local
---
#### `Breadroll.open.local(...)`
This function opens the local data source, ie. the file on disk and return a Dataframe

Parameter

- `filepath: string` - the location of the file.

```typescript
const csv: Breadroll = new Breadroll({ header: true, delimiter: "," });
const df: Dataframe = await csv.open.local("./data/ds_salaries.csv");
const filtered = df.filter("job_title", "equals", "Data Scientist").count;
```