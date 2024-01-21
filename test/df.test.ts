import { describe, expect, test } from "bun:test";
import Breadroll from "../src/index";
import assert from "assert";

// Instanciate DF Class & Open file
const file = new Breadroll("./test/data/test.csv", { header: true, delimiter: "," });
const df = await file.open();

/**
 * Testing IO (Input/Output) of none empty file
 */
describe("testing IO - mock test", () => {
  /**
   * Test that if file is not empty after read and parsing
   * that it shouldn't be empty
   */
  test("if file is not empty, it should not be an empty array", () => {
    assert.notEqual([], df.value);
  });

  /**
   * Test that if file has headers ie. specified from `DFReadOptions.header`
   * the keys list should not be empty
   */
  test("Labels should not be empty", () => {
    assert.notEqual([], df.labels);
  });

  /**
   * Test that getting the head of the file should return the first five
   * rows of the data frame
   */
  test("Head count should be 5", () => {
    expect(df.head.count).toEqual(5);
  });
});

/**
 * Testing Other Functionalities
 */

describe("testing - dataframe functionality", () => {
  /**
   * Mock test - check filter features, on ckd dataset
   * width filtered dataframe of class, equal to, notckd
   */
  test("get the number of class = notckd", () => {
    expect(df.filter("class", "equal to", "notckd").count).toEqual(150);
  });

  test("get the number of age >= 60", () => {
    expect(df.filter("age", "greater than or equal to", 60).count).toEqual(150);
  });

  test("select return the desired keys", () => {
    const selected = df.select(["class", "age", "hemo", "sc", "al", "bp"]).value[0];
    expect(Object.keys(selected)).toEqual(["class", "age", "hemo", "sc", "al", "bp"]);
  });
});
