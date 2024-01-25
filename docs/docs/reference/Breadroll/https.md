---
title: .open.https
---
#### `Breadroll.open.https(...)`
This function fetchs and return a file via a URL over https, with a default `GET` method

Parameter

- `url: string` - the remote location of the file.
- `header?:` [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) - add custom headers to the HTTP request

```typescript
const df: Dataframe = await csv.open.https("https://raw.githubusercontent.com/devsgnr/breadroll/main/test/data/test.csv");
const selected: Dataframe = df.select(["class", "age", "hemo", "sc", "al", "bp"]);
```