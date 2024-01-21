---
title: .to_blob
---

#### `Dataframe.to_blob(...)`
Parameters

- `filetype: "csv" | "tsv"` - is a `Union` type that sets the available MIME filetype

This function converts the current dataframe into a Blob of MIME filetype `"csv" | "tsv"`

```typescript
const blob: Blob = df.to_blob("csv");
```
