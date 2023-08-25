# Changelog

### Aug 19th - v0.1

- `DF.head` returns the first five rows of the dataframe
- `DF.labels` returns the labels of the dataframe
- `DF.filter(key: string, filter: Condition, value: unknown)` - filters the rows in `DF` and returns `DFObject(dataframe)`
- `DFObject.aggregate()` - exposes the `DFObject`'s dataframe either before or after adding a filter using `DFObject.filter(...args)`
- `DFObject.count`, `DF.count` - returns the count of rows in the dataframe or dataframe object
- `DF.isNull` - returns all the rows that have some properties equals to `null`
- `DF.notNull` - returns all the rows that have every property equals to `!null`
- `DF.dtypes` - returns all the data types of all the columns in the dataframe

### Aug 24th - v0.1.2

- `DF` changed to `DataFile` which only handles file opening and saving
- `DFObject` changed to handle and maintain the Javascript object generated after parsing by `DataFile`
- Modified test suite to remove a lot of unneccesary tests
