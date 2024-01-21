import Breadroll, { Dataframe } from "./src";

const file: Breadroll = new Breadroll("./test/data/ds_salaries.csv", { header: true, delimiter: "," });
const df: Dataframe = await file.open();

const salaries_over_70k = df.filter("salary", "greater than", 70000);
console.log("Salaries over 70,000 ->", salaries_over_70k.count);
console.log("Salaries over 70,000, average salary ->", salaries_over_70k.average("salary"));
console.log("Salaries over 70,000, sum salary ->", salaries_over_70k.sum("salary"));

const _file: Breadroll = new Breadroll("./test/data/adult.csv", { header: true, delimiter: "," });
const _df: Dataframe = await _file.open();

const workclass__private = _df.filter("workclass", "equal to", "Private");
console.log("Workclass is Private ->", workclass__private.count);

const has_question_mark = _df.use((obj) => {
  const filtered = obj.filter((object) => Object.values(object).some((value) => value === "?"));
  return new Dataframe(filtered);
});

console.log("Unknown ? value ->", has_question_mark.count);

const age_between_30_to_40 = _df.filter("age", "is between", 30, 40);
console.log("Age between 30 to 40 ->", age_between_30_to_40.count);
console.log("Age between 30 to 40, capital_gain sum ->", age_between_30_to_40.sum("capital_gain"));
console.log("Age between 30 to 40, capital_gain average ->", age_between_30_to_40.average("capital_gain"));
console.log("Age between 30 to 40, capital_gain max ->", age_between_30_to_40.max("capital_gain"));
console.log("Age between 30 to 40, capital_gain min ->", age_between_30_to_40.min("capital_gain"));
console.log("Salaries over 70K, salary max ->", salaries_over_70k.max("salary"));
console.log("Salaries over 70K, salary min ->", salaries_over_70k.min("salary"));

const ckd: Breadroll = new Breadroll("./test/data/test.csv", { header: true, delimiter: "," });
const ckd_df: Dataframe = await ckd.open();
const ckd_true = ckd_df.filter("age", "greater than or equal to", 60);
const ckd_true_selected = ckd_true.select(["class", "age", "hemo", "sc", "al", "bp"]);

console.log(ckd_true_selected.head.value);
