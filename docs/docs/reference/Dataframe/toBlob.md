---
title: .toBlob
---

#### `Dataframe.toBlob(...)`
Parameters

- `filetype: "csv" | "tsv"` - is a `Union` type that sets the available MIME filetype

This function converts the current dataframe into a Blob of MIME filetype `"csv" | "tsv"`

```typescript
const blob: Blob = df.toBlob("csv");
```
