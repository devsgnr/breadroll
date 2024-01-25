import { describe, expect, test } from "bun:test";
import Breadroll from "../src/index";
import assert from "assert";

// Instanciate DF Class & Open file
const file = new Breadroll({ header: true, delimiter: "," });
const df = await file.open.local("./test/data/test.csv");
const remote_https = await file.open.https(
  "https://firebasestorage.googleapis.com/v0/b/data-entry-fa6df.appspot.com/o/backup%2F2023-10-23T12%3A21%3A12.467Z.csv?alt=media&token=cbccdc42-aa43-4ee4-82fb-7ea5180df918",
);

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

/**
 * Testting Remote Data Source - HTTPS
 */

describe("testing remote data source - https", () => {
  /**
   * Test that the remote source retrieve the remote data source
   * via https and then converts to Dataframe and can read out values
   */
  test("get a remote data source and return Dataframe", () => {
    expect(remote_https.value).toBeTypeOf("object");
  });
});
