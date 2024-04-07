import { describe, expect, test } from "bun:test";
import Breadroll from "../src/index";
import demo from "./data/demo.json";
import assert from "assert";

// Third Party Import
import { createClient } from "@supabase/supabase-js";

const url = String(Bun.env.SUPABASE_URL);
const key = String(Bun.env.SUPABASE_KEY);
const client = createClient(url, key);

// Instanciate DF Class
const file = new Breadroll({ header: true, delimiter: ",", supabase: client });
// Do not parse numbers
const csv = new Breadroll({ header: true, delimiter: ",", parseNumber: false });

// Open various data sources - local and remote sources
const df = await file.open.local("./test/data/test.csv");
const salary = await file.open.local("./test/data/ds_salaries.csv");
const adult = await file.open.local("./test/data/adult.csv");
const remote_https = await file.open.https("https://raw.githubusercontent.com/devsgnr/breadroll/main/test/data/test.csv");
const supabase_storage = await file.open.supabaseStorage("breadroll-test", "cities.csv");
// Open data source - without parsing numbers
const cities = await csv.open.local("./test/data/cities.csv");
const json = csv.open.json(demo);

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

  /**
   * Test JSON loading
   */
  test("JSON loads and returns a value", () => {
    assert.notEqual([], json.value);
  });
});

/**
 * Testing Other Functionalities
 */

describe("testing dataframe functionality", () => {
  /**
   * Mock test - check filter features, on ckd dataset
   * width filtered dataframe of class, equal to, notckd
   */
  test("get the number of class = notckd", () => {
    expect(df.filter("class", "==", "notckd").count).toEqual(150);
  });

  test("get the number of age >= 60", () => {
    expect(df.filter("age", ">=", 60).count).toEqual(150);
  });

  test("select return the desired keys", () => {
    const selected = df.select(["class", "age", "hemo", "sc", "al", "bp"]).labels;
    expect(selected).toEqual(["class", "age", "hemo", "sc", "al", "bp"]);
  });

  test("applying an operation to a specific column", () => {
    const applied = df.apply({ key: "age", fn: (value) => value / 2 });
    expect(applied.labels.includes("age_new")).toEqual(true);
  });

  test("setting parseNumber to false - does not parse numbers", () => {
    const notParsed = Object.values(cities.dtypes);
    expect(notParsed.includes("number")).toEqual(false);
  });
});

/**
 * Testing I/O Remote Data Source - HTTPS & Supabase Storage
 */

describe("testing IO remote data source - https", () => {
  /**
   * Test that the remote source retrieve the remote data source
   * via https and then converts to Dataframe and can read out values
   */
  test("get a remote data source", () => {
    expect(remote_https.value).toBeArrayOfSize(400);
  });

  /**
   * Test that you can select specific columns of interest in the dataframe
   * after the dataframe has been returned
   */
  test("select specific columns from remote data source", () => {
    const selected = remote_https.select(["age", "hemo"]);
    expect(selected.labels).toEqual(["age", "hemo"]);
  });

  /**
   * Test that the remote source "Supabase Storage" retrive that
   * data and converts it
   */
  test("get a remote data source - supabase", () => {
    expect(supabase_storage.value).toBeArrayOfSize(148062);
  });

  /**
   * Test that you can select specific columns of interest in the dataframe
   * after the dataframe has been returned from Supabase
   */
  test("select specific columns from remote data source - supabase", () => {
    const selected = supabase_storage.select(["longitude", "latitude"]);
    expect(selected.labels).toEqual(["longitude", "latitude"]);
  });

  /**
   * Test that supabase should throw an error if the supabase client is
   * not provided in the constructor
   */
  test("throw error when there's no client", () => {
    expect(async () => {
      await csv.open.supabaseStorage("breadroll-test", "cities.csv");
    }).toThrow("No Supabase Client provided");
  });
});

/**
 * Testing interger based indexing or selection for
 * Dataframe
 */

describe("testing integer based indexing", () => {
  /**
   * Test to see if Dataframe.cols return the correct columns
   * specified from the integer based indexing arguments
   */
  test("get the first 5 columns in the dataframe", () => {
    const [start, end] = [0, 4];
    const mock_label = remote_https.labels.splice(start, end);
    const iloc = remote_https.cols({ start, end });
    expect(iloc.labels).toEqual(mock_label);
  });

  test("get 4 columns from the second index", () => {
    const [start, end] = [1, 4];
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

  /**
   * Testing to see if the Dataframe.rows return the correct rows
   * specified from the integer based indexing arguments
   */
  test("return the first 20 rows of the dataframe", () => {
    const rows = remote_https.rows({ end: 20 });
    expect(rows.count).toEqual(20);
  });

  /**
   * Test to see if providing none of the values give the entire
   * rows of the Dataframe in return
   */
  test("return the entire rows of the dataframe", () => {
    const rows = salary.rows({});
    expect(rows.count).toEqual(608);
  });
});

/**
 * Testing `matches` filter that uses RegExp
 */
describe("testing matches filter with RegExp", () => {
  /**
   * This test makes case-insensitive matches
   */
  test("match all job_title with engineer - i", () => {
    const re = new RegExp(/engineer/, "i");
    const filtered = salary.filter("job_title", "matches", re);
    assert.notEqual(filtered.value, []);
  });

  /**
   * This test with large dataset of 35k+ entries
   */
  test("match all occupation with manager - i, larger dataset of 35k+", () => {
    const re = new RegExp(/manager*/, "i");
    const filtered = adult.filter("occupation", "matches", re);
    assert.notEqual(filtered.value, []);
  });
});
