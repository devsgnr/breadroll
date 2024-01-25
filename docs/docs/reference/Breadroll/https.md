---
title: .open.https
---
#### `Breadroll.open.https(...)`
This function fetchs and return a file via a URL over https, with a default `GET` method, with optional provision for custom headers

Parameter

- `url: string` - the remote location of the file.
- `header?:` [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) - add custom headers to the HTTP request

```typescript
const df: Dataframe = await csv.open.https("https://raw.githubusercontent.com/devsgnr/breadroll/.../ds_salaries.csv");
const selected: Dataframe = df.select(["job_title", "salary", "salary_currency", "salary_in_usd"]);
```