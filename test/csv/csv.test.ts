import { describe, expect, test } from "bun:test";
import DF from "../../src/df";
import assert from "assert";

// Instanciate DF Class & Open file
const file = new DF("./test/csv/test.csv", { header: true, delimiter: "," });
const object = await file.open();

/**
 * Testing IO (Input/Output) of none empty file
 */
describe("testing IO - mock test", () => {
  /**
   * Test that if file is not empty after read and parsing
   * that it shouldn't be empty
   */
  test("if file is not empty, it should not be an empty array", () => {
    assert.notEqual([], object.object);
  });

  /**
   * Test that if file has headers ie. specified from `DFReadOptions.header`
   * the keys list should not be empty
   */
  test("if header option is true, keys list should not be empty", () => {
    assert.notEqual([], object.getKeys);
  });

  /**
   * Test that getting the head of the file should return the first five
   * rows of the data frame
   */
  test("get head, should return the first five rows", () => {
    expect(object.head.length).toBe(5);
  });
});
