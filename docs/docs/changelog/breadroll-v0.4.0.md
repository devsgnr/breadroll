---
title: breadroll v0.4.0
---

<small>February 14, 2024</small>

---

In breadroll's new version **0.4.0** a lot of new shiny features are introduced, Here are the cool new features

- Improvements to the `Breadroll` and the `Dataframe` API
- Introduction of a new remote data source
- Changed filter keywords in favor of symbols over length words
- A snazzy new way to perform data transformation
- Introuducing `NumericConstants` - a collection of mathematical and physical constants
- breadroll hit 35 :stars: stars on GitHub - and still rising.

---

## API Improvements
The `Breadroll` & `Dataframe` APIs got a little face lift, with two major addition to the `Breadroll` API and a few more others to the `Dataframe` API;

- `DataframeReadOptions?.parseNumber: string` - This is an optional property that allows you to opt out of parsing numbers defaults to `true`, when set to `false` all values are returned as strings
- `DataframeReadOptions?.supabase: SupabaseClient` - This is an optional property takes in the Supabase client created via `createClient(..., ...)`, this property enables `Breadroll.open.supabaseStorage` method.
- By default headers (labels) were being converted to lower-case, now headers (labels) maintain case-sensitivity
- `Dataframe.apply({...}: Apply)` - This function allows you to perform data transformation on a specified column of the dataframe

### New Remote Data Source :rocket: - Supabase
- `Breadroll.open.supabaseStorage(bucketName: string, filepath: string)` - This function takes in the bucket name and filepath of the file, downloads the file, parses the files and retuns a Dataframe

### Symbol-based Filter Keywords
The use of symbols as keyword ensurces less verbosity; most of the filter keywords have been replaced with symbols; `"eqauls"` is now `"=="` see the full changes [here](/reference/Dataframe/filter/)

## Numeric Constants
In addition to having the ability to perform data transformation using `Dataframe.apply({...})`, the numeric constant object provides mathematical (`math`) and physical (`physical`) constants. These two can be nicely paired to make cool data transformation scientific datasets.
