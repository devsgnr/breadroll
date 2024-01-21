---
title: .dtypes
---

#### `Dataframe.dtypes`
This function return an object `ObjectType` that shows the data type of each column in the dataframe in a key:value pair

```typescript
const dtypes: ObjectType = df.dtypes; // { age: "number", workclass: "string", ... }
```