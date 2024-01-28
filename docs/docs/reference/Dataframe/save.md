---
title: .save
---

#### `Dataframe.save`
This is a getter function that return the following functions, each of these functions return a `Promise<number>` which returns the size of the file that has been saved to disk

- `.json(filepath: string): Promise<number>` - This function saves `Dataframe` as a JSON files ie. for example.
    ```typescript
    df.save.json("./file.json");
    ```

- `.csv(filepath: string): Promise<number>` - This function saves `Dataframe` as a CSV files ie. for example.
    ```typescript
    df.save.csv("./file.csv");
    ```

- `.tsv(filepath: string): Promise<number>` - This function saves `Dataframe` as a TSV files ie. for example.
    ```typescript
    df.save.tsv("./file.tsv");
    ```