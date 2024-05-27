/**
 * This test file is used for running Bun specific aspects of
 * breadroll - mainly interaction with the file-system, ie. opening
 * and saving files
 */

import { describe, expect, test } from "bun:test";
import Breadroll, { Dataframe } from "../src";
import { CKD, Cities } from "./types";

/**
 * Variables
 */
import demo from "./data/demo.json";
const URL = "https://raw.githubusercontent.com/devsgnr/breadroll/main/test/data/test.csv";
const ERRORNOUS_URL = "https://raw.githubusercontent.com/devsgnr/breadroll/main/test/data/no_file.csv";

/**
 * Breadroll Instance
 */
const instance = new Breadroll({ header: true });

/**
 * Test Cases - Opening Files
 */
describe("Testing File-system Operation: Opening Files", () => {
  test("Open a File Locally: CSV", async () => {
    const dataframe = await instance.open.local<CKD>("./test/data/test.csv", ",");
    expect(dataframe).toBeInstanceOf(Dataframe<CKD>);
    expect(dataframe.value.length).toBeGreaterThan(0);
  });

  test("Open a File Locally: TSV", async () => {
    const dataframe = await instance.open.local<CKD>("./test/data/test.tsv", "\t");
    expect(dataframe).toBeInstanceOf(Dataframe<CKD>);
    expect(dataframe.value.length).toBeGreaterThan(0);
  });

  test("Open a File from Remote Source: CSV", async () => {
    const dataframe = await instance.open.https<CKD>(URL, ",");
    expect(dataframe).toBeInstanceOf(Dataframe<CKD>);
    expect(dataframe.value.length).toBeGreaterThan(0);
  });

  test("Open a File: JSON", () => {
    const dataframe = instance.open.json<Cities>(demo);
    expect(dataframe).toBeInstanceOf(Dataframe<Cities>);
    expect(dataframe.value.length).toBeGreaterThan(0);
  });

  test("Throw Expection: File Not Found", () => {
    expect(async () => {
      await instance.open.local<CKD>("./test/data/no_file.csv", ",");
    }).toThrow("File Not Found");
  });

  test("Throw Remote Source Exception: CSV", () => {
    expect(async () => {
      await instance.open.https<CKD>(ERRORNOUS_URL, ",");
    }).toThrow("Remote Resource: Not Found");
  });
});

/**
 * Test Cases - Saving / Writing Files
 */
describe("Testing File-system Operation: Saving / Writing Files", async () => {
  const dataframe = await instance.open.local<CKD>("./test/data/test.csv", ",");
  const cities = await instance.open.local<Cities>("./test/data/cities.csv", ",");

  test("Save Dataframe as: CSV", async () => {
    const size = await dataframe.save.csv("./test/data/test.csv");
    expect(size).toBeNumber();
  });

  test("Save Dataframe as: TSV", async () => {
    const size = await dataframe.save.tsv("./test/data/test.tsv");
    expect(size).toBeNumber();
  });

  test("Save Dataframe as: JSON", async () => {
    const size = await cities.save.json("./test/data/demo.json");
    expect(size).toBeNumber();
  });
});
