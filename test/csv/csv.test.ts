import { describe, expect, test } from "bun:test";
import * as mock from "../result.json";
import DF from "../../src/df";

// Instanciate DF Class
const file = new DF("./test/csv/test.csv", ",", { header: true });

/**
 * Testing IO (Input/Output)
 */
describe("testing IO", () => {
  /**
   * Test that file is read, parsed and tested against the
   * corresponds to existing mock json
   */
  test("open, read & to json", async () => {
    await file.read().then((result) => {
      const json = JSON.stringify(result.object, null, 2);
      expect(json).toBe(mock);
    });
  });
});
