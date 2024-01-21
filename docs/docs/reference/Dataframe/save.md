---
title: .save
---

#### `Dataframe.save`
This is a getter function that return the following functions

- `.json(filepath: string)` - This function saves `Dataframe` as a JSON files ie. for example.
    ```typescript
    df.save.json("./file.json");
    ```

- `.csv(filepath: string)` - This function saves `Dataframe` as a CSV files ie. for example.
    ```typescript
    df.save.csv("./file.csv");
    ```

- `.tsv(filepath: string)` - This function saves `Dataframe` as a TSV files ie. for example.
    ```typescript
    df.save.tsv("./file.tsv");
    ```