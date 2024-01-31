---
title: .save
---

#### `Dataframe.save`
This is a getter function that return the following functions, each of these functions return a `Promise<number>` which returns the size of the file that has been saved to disk, that is:

```typescript
// Save as json
df.save.json("./file.json");

// Save as csv
df.save.csv("./file.csv");

// Save as tsv
df.save.tsv("./file.tsv");
```