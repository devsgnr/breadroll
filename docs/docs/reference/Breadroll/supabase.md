---
title: .open.supabaseStorage
---
#### `Breadroll.open.supabaseStorage(...)`
This function takes in the bucket name and filepath of the file, downloads the file, parses the files and retuns a Dataframe

Parameter

- `bucketName: string` - the Supabase bucket name.
- `filepath: string` - the specific file name in the specified bucket

```typescript
const df: Dataframe = await csv.open.supabseStorage("bucketName", "filepath");
```