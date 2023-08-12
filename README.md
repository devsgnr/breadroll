## ts_df

A simple lightweight application library for parsing csv and tsv and performing EDA (exploratory data analysis)

## API

The method are exposed via the `SV` class
| Method | Parameters | Returns |
| --------- | --------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `read()` | `filepath: string` this is the file location | `res: ObjectType` |
| | `delimiter: string` this is the delimiter value | |
| | `option: SVReadOption` | |
| `save()` | `filepath: string` this where the data will be saved | `res: IOSave` |
| `getKeys` | nil | `res: Array<string>` |

This project was created using `bun init` in bun v0.6.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
