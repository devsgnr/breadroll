<div align="center">
  <img src="./docs/docs/assets/png/breadroll_brand.png" />
</div>

<br/><br/>

<p align="center">Breadroll, short for Typescript Dataframe, is a simple lightweight application library for parsing csv, tsv, and other delimited files, performing EDA (exploratory data analysis), and data processing operations on multivariate datasets. Think pandas but written in Typescript and developed on the <a href="https://bun.sh" target="_blank">Bun.js</a> Runtime.</p>

<p align="center">⚠️ This library is experimental and is still in active development. Although we make sure each version is tested throughly,
we suggest you use it with some caution, as some unexpected behaviors can be present.</p>

<br/>

- **Fast**: Breadroll is built on Bun.js, the all-in-one Javascript built for speed
- **File I/O**: With current support for local data sources, **remote sources support coming soon**
- **Easy-to-use**: Write queries in an easy-to-understand, with filter keyword that read as a sort-of SQL-like keyword


### **Easy API**
Breadroll provides an easy to use API that gets you from zero to data processing in no time, with lazy loading of these delimited files via Bun's File I/O `Bun.file()`, the file parsed based on the `DataframeReadOptions`, and convert into a `Dataframe`, and easily read out the content of the Dataframe using `.value`.

```typescript
const file: Breadroll = new Breadroll("./data/ds_salaries.csv", { header: true, delimiter: "," });
const df: Dataframe = await file.open();
const values = df.values // return [{}, {},...]

console.log(values)
```

### **Filtering**
Peform complex filtering; with various filters including range filters like `in between` that can be achieved using an optional function parameter `limit` which is the upper limit. These range filter are only effective with numbers (integers, floating-point).
```typescript
df.filter("age", "is between", 30, 40); // returns number
```
Perform even more complex filtering with multiple / chained filter, you can chain the filter ie. filtering the previously filtered `Dataframe`, the chained filter can be as long as you need them to be.
```typescript
df.filter("age", "is between", 30, 40)
  .filter("salary", "greater than", 70000)
  .filter("work_year", "equals", 2020); // return Dataframe
```

### **A Little Math**
Get a single number that accurately represents the underlying data with the many provided aggregation functions, the likes of average (mean), max, min, sum, count, etc. with more in development
```typescript
df.sum("capital_gain") // returns number
df.average("capital_gain") // returns number
df.count // returns number
```

---
This project running on bun v1.0.22. [Bun.js](https://bun.sh) is a fast all-in-one JavaScript runtime.