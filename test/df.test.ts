import { describe, expect, test } from "bun:test";
import Breadroll from "../src/index";
import assert from "assert";

// Instanciate DF Class
const file = new Breadroll({ header: true, delimiter: "," });

// Open various data sources - local and remote sources
const df = await file.open.local("./test/data/test.csv");
const remote_https = await file.open.https("https://raw.githubusercontent.com/devsgnr/breadroll/main/test/data/test.csv");

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
 * Testing I/O Remote Data Source - HTTPS
 */

describe("testing IO remote data source - https", () => {
  /**
   * Test that the remote source retrieve the remote data source
   * via https and then converts to Dataframe and can read out values
   */
  test("get a remote data source", () => {
    expect(remote_https.value).toBeTypeOf("object");
  });

  /**
   * Test that you can select specific rows of interest in the dataframe
   * after the dataframe has been returned
   */
  test("select specific rows from remote data source", () => {
    const selected = remote_https.select(["age", "hemo"]);
    expect(selected.value).toBeTypeOf("object");
  });
});

/**
 * Testing interger based indexing or selection for
 * Dataframe
 */

describe("testing integer based indexing", () => {
  test("get the first 5 columns in the dataframe", () => {
    const [start, end] = [0, 4];
    const mock_label = remote_https.labels.splice(start, end);
    const iloc = remote_https.cols({ start, end });
    expect(iloc.labels).toEqual(mock_label);
  });

  /**
   * Test to see if providing none of the values give the entire
   * Dataframe columns as the return value
   */
  test("return the entire columns of the dataframe if both indices are not provided", () => {
    const mock_label = remote_https.labels;
    const iloc = remote_https.cols({});
    expect(iloc.labels).toEqual(mock_label);
  });
});
