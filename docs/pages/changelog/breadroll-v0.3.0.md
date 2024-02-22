---
title: breadroll v0.3.0
---

<small>January 19th, 2024</small>

---

`Dataframe.to_blob(filetype: "csv" | "tsv"): Blob` This function converts the current dataframe into a Blob of MIME filetype `"csv" | "tsv"`

`Dataframe.save`

- `.json(filepath: string)`: This function saves `Dataframe` as a JSON files ie. for example `Dataframe.save.json(filepath: string)`.
- `.csv(filepath: string)`: This function saves `Dataframe` as a CSV files ie. for example `Dataframe.save.csv(filepath: string)`.
- `.tsv(filepath: string)`: This function saves `Dataframe` as a TSV files ie. for example `Dataframe.save.tsv(filepath: string)`.