import { describe, expect, test } from "bun:test";
import Breadroll from "../src/index";
import assert from "assert";

// Types
import { CKD, Cities } from "./types";

// Instance DF Class - Parse Numbers
const instance = new Breadroll({ header: true });
// Instance DF Class - Doesn't Parse Numbers
const noparse = new Breadroll({ header: true, parseNumber: false });

// Open Various Data Sources - Locally
const df = await instance.open.local<CKD>("./test/data/test.csv", ",");
const salary = await instance.open.local("./test/data/ds_salaries.csv", ",");
const adult = await instance.open.local("./test/data/adult.csv", ",");

// Open Data Source - Without Parsing Numbers
const cities = await noparse.open.local<Cities>("./test/data/cities.csv", ",");

// Mock
const above_sixty = df.filter("age", ">=", 60);
const concat = df.concat(above_sixty);

/**
 * Testing IO (Input/Output) of none empty file
 */
describe("Dataframe: General Test", () => {
  /**
   * Test that if file is not empty after read and parsing
   * that it shouldn't be empty
   */
  test("Dataframe: Not Empty", () => {
    assert.notEqual([], df.value);
  });

  test("Dataframe: Labels Present", () => {
    assert.notEqual([], df.labels);
  });

  /**
   * Test that getting the head of the file should return the first five
   * rows of the data frame
   */
  test("Dataframe: Head Count Equals 5", () => {
    expect(df.head.count).toEqual(5);
  });
});

/**
 * Testing Dataframe Functionalities
 */

describe("Dataframe: Functionality Test", () => {
  test("NOTCKD Patient Are 150", () => {
    expect(df.filter("class", "==", "notckd").count).toEqual(150);
  });

  test("Patients That Are / Over 60", () => {
    expect(df.filter("age", ">=", 60).count).toEqual(150);
  });

  test("Select Desired Columns", () => {
    const selected = df.select(["class", "age", "hemo", "sc", "al", "bp"]).labels;
    expect(selected).toEqual(["class", "age", "hemo", "sc", "al", "bp"]);
  });

  test("Apply Function Creates New Column", () => {
    const applied = df.apply({ key: "age", fn: (value) => value / 2 });
    expect(applied.labels.includes("age_new")).toEqual(true);
  });

  test("Parse Number False - No Parsed Number", () => {
    const notParsed = Object.values(cities.dtypes);
    expect(notParsed.includes("number")).toEqual(false);
  });

  test("Shape of Dataframe Equals [400, 26]", () => {
    expect(df.shape).toBeArrayOfSize(2);
    expect(df.shape).toStrictEqual([df.count, 26]);
  });

  test("toNumber - Convert Specified Columns", () => {
    const cities_converted = cities.toNumber(["id", "state_id", "latitude", "longitude", "country_id"]);
    const findNumberType = Object.values(cities_converted.dtypes);
    expect(findNumberType.includes("number")).toEqual(true);
  });

  test("Count After Concat Is Correct", () => {
    expect(concat.count).toBe(551);
  });

  test("Merging Two Dataframe - Mock Correct", () => {
    const mock_label = Object.keys({ ...df.value[0], ...cities.value[0] });
    const merged = df.merge(cities);
    expect(merged.labels).toEqual(mock_label);
  });

  test("Integer Indexing - First Five Rows", () => {
    const [start, end] = [0, 4];
    const mock_label = df.labels.splice(start, end);
    const iloc = df.cols({ start, end });
    expect(iloc.labels).toEqual(mock_label);
  });

  test("Integer Indexing - Four Row From Second Row", () => {
    const [start, end] = [1, 4];
    const mock_label = df.labels.splice(start, end);
    const iloc = df.cols({ start, end });
    expect(iloc.labels).toEqual(mock_label);
  });

  test("Integer Indexing - All Column Returned With Empty Object", () => {
    const mock_label = df.labels;
    const iloc = df.cols({});
    expect(iloc.labels).toEqual(mock_label);
  });

  test("Interger Indexing - First 20 Rows", () => {
    const rows = df.rows({ end: 20 });
    expect(rows.count).toEqual(20);
  });

  test("Integer Indexing - Return Entire Rows With Empty Object", () => {
    const rows = salary.rows({});
    expect(rows.count).toEqual(607);
  });

  test("RegEx Filter - Match All 'job_title' With 'engineer'", () => {
    const re = new RegExp(/engineer/, "i");
    const filtered = salary.filter("job_title", "matches", re);
    assert.notEqual(filtered.value, []);
  });

  test("RegEx Filter - Match All 'occupation' with 'manager'", () => {
    const re = new RegExp(/manager*/, "i");
    const filtered = adult.filter("occupation", "matches", re);
    assert.notEqual(filtered.value, []);
  });
});
