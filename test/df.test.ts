import { describe, expect, test } from "bun:test";
import DF from "../src/df";
import assert from "assert";

// Instanciate DF Class & Open file
const file = new DF("./test/test.csv", { header: true, delimiter: "," });
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
    assert.notEqual([], df.object);
  });

  /**
   * Test that if file has headers ie. specified from `DFReadOptions.header`
   * the keys list should not be empty
   */
  test("if header option is true, keys list should not be empty", () => {
    assert.notEqual([], df.labels);
  });

  /**
   * Test that getting the head of the file should return the first five
   * rows of the data frame
   */
  test("get head, should return the first five rows", () => {
    expect(df.head.length).toBe(5);
  });

  /**
   * Test DF.filter
   */
  test("class is notckd is 250", () => {
    expect(df.filter("class", "equals", "notckd").count).toEqual(150);
  });

  /**
   * Test DF.hasNotNull count with an expected
   * result of 18
   */
  test("dataframe has 18 rows with every values not null", () => {
    expect(df.notNull.count).toEqual(18);
  });

  /**
   * Test DF.labels count the expected
   * result is 26
   */
  test("dataframe column labels count should be 26", () => {
    expect(df.labels.length).toEqual(26);
  });
});
