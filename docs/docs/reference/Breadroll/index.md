---
title: Breadroll
---
#### `Breadroll(...)`
Parameters

  - `options: DataframeReadOptions`
    - `DataframeReadOptions.header: boolean` when set to `true`, Breadroll automatically gets the header from the file
    - `DataframeReadOptions.delimiter: string` the delimiting string, it could be a variety of delimiter, eg. `","` and more
    - `DataframeReadOptions?.keys: Array<string>` this is an optional property for when `DataframeReadOptions.header` is `false`
    - `DataframeReadOptions?.parseNumber: boolean` - This is an optional property that allows you to opt out of parsing numbers; defaults to `true`, when set to `false` all values are returned as strings
    - `DataframeReadOptions?.supabase: SupabaseClient` - This is an optional property takes in the Supabase client created via `createClient(..., ...)`, this property enables `Breadroll.open.supabaseStorage` method.

