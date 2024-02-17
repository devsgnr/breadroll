breadroll 🥟 The lightweight application toolkit for data analysis and data processing operations in JavaScript

---

<br/>

![](https://raw.githubusercontent.com/devsgnr/breadroll/v0.3.1/docs/docs/assets/png/breadroll_brand.png)

![npm](https://img.shields.io/npm/v/breadroll)
![breadroll docs status](https://github.com/devsgnr/breadroll/actions/workflows/docs.yml/badge.svg)
![breadroll test status](https://github.com/devsgnr/breadroll/actions/workflows/testing.yml/badge.svg)
![breadroll test status](https://github.com/devsgnr/breadroll/actions/workflows/macos_testing.yml/badge.svg)
![GitHub Stars](https://img.shields.io/github/stars/devsgnr/breadroll)
[![Built with Material for MkDocs](https://img.shields.io/badge/Material_for_MkDocs-526CFE?logo=MaterialForMkDocs&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)

breadroll 🥟 is a simple lightweight application toolkit for parsing csv, tsv, and other delimited files, performing EDA (exploratory data analysis), and data processing operations on multivariate datasets. Think pandas but written in Typescript and developed on the [Bun](https://bun.sh) Runtime.

<br/>

- **Fast**: breadroll is built on Bun, the all-in-one Javascript runtime built for speed
- **File I/O**: Support for local & remote sources loved by JS developers - **Local, HTTPS, & Supabase Storage**
- **Easy-to-use**: Compose queries using filter keywords that are simple and are easy to comprehend

---

### Table of Content

1. <a href="https://devsgnr.github.io/breadroll/" target="_blank">Introduction</a>
2. <a href="https://devsgnr.github.io/breadroll/reference/Breadroll/" target="_blank">API Reference</a>
3. <a href="https://devsgnr.github.io/breadroll/changelog/breadroll-v0.1.0/" target="_blank">Changelog</a>

---

### **Installation**

System Requirements:

- [Bun](https://bun.sh)
- MacOS, Linux
- Typescript >= 5.1

---

#### Bun
breadroll is built on and optimized for Bun.js. You can install Bun by running the following
```bash
curl https://bun.sh/install | bash
```
create a new Bun project by running
```bash
bun init
```
then you can now install **breadroll** using
```bash
bun add breadroll
```
---

### **Easy API**
breadroll provides an easy to use API that gets you from zero to data processing in no time, with lazy loading of these delimited files via Bun's File I/O `Bun.file()`, the file parsed based on the `DataframeReadOptions`, and convert into a `Dataframe`, and easily read out the content of the Dataframe using `.value`.

```typescript
import Breadroll, { Dataframe } from "breadroll";

const csv: Breadroll = new Breadroll({ header: true, delimiter: "," });
```

Example: From one instance example above, you can open multiple `csv` files

```typescript
const df: Dataframe = await csv.open.local("./data/ds_salaries.csv");
```

### **Remote Data Sources**
breadroll makes it easy to work with remote data sources with current support for HTTPS and @supabase Storage. With other remote data sources on the roadmap.

```typescript
const df: Dataframe = await csv.open.https("https://.../.../filename.csv");
const df: Dataframe = await csv.open.supabaseStorage("bucketName", "filepath");
```

### **Filtering**
Peform complex filtering; with various filters including range filters like `in between` that can be achieved using an optional function parameter `limit` which is the upper limit. These range filter are only effective with numbers (integers, floating-point).
```typescript
df.filter("age", "in between", 30, 40);
```
Perform even more complex filtering with multiple / chained filter, you can chain the filter ie. filtering the previously filtered `Dataframe`, the chained filter can be as long as you need them to be.
```typescript
df.filter("age", "in between", 30, 40)
  .filter("salary", ">", 70000)
  .filter("work_year", "==", 2020);
```

### **A Little Math**
Get a single number that accurately represents the underlying data with the many provided aggregation functions, the likes of average (mean), max, min, sum, count, etc. with more in development
```typescript
df.sum("capital_gain")
df.average("capital_gain")
df.count
```

---
This project running on bun v1.0.22. [Bun.js](https://bun.sh) is a fast all-in-one JavaScript runtime.