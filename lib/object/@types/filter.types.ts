type Condition = "equals" | "not equals" | "contains" | "greater than" | "less than";
type FilterType = readonly [string, Condition, unknown];

export { Condition, FilterType };
