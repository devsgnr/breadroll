/**
 * This test file is used for running Supabase specific aspects of
 * breadroll - mainly interaction with the Supabase Storage, and
 * it is meant only for CI testing
 */
import { createClient } from "@supabase/supabase-js";
import Breadroll, { Dataframe } from "../src";
import { describe, expect, test } from "bun:test";
import { CKD } from "./types";

/**
 * Variables
 */
const [url, key] = [String(Bun.env.SUPABASE_URL), String(Bun.env.SUPABASE_KEY)];
const client = createClient(url, key);

/**
 * Breadroll Instance
 */
const instance = new Breadroll({ header: true, supabase: client });

/**
 * Test Case - Interacting with Supabase Storage
 */
describe("Supabase Storage", () => {
  test("Open a File: CSV", async () => {
    const dataframe = await instance.open.supabaseStorage<CKD>("breadroll-test", "test.csv", ",");
    expect(dataframe).toBeInstanceOf(Dataframe<CKD>);
  });

  test("Throw Exception: File Not Found", () => {
    expect(async () => {
      await instance.open.supabaseStorage("breadroll-test", "no_file.csv", ",");
    }).toThrow("Supabase: File Error");
  });
});
