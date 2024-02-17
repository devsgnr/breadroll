---
title: .toBlob
---

#### `Dataframe.toBlob(...)`
This function converts the current dataframe into a Blob of MIME filetype `"csv" | "tsv"`

Parameters

- `filetype: "csv" | "tsv"` - is a `Union` type that sets the available MIME filetype

```typescript
const blob: Blob = df.toBlob("csv");
```