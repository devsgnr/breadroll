import { describe, expect, test } from "bun:test";
import * as mock from "../result.json";
import SV from "../../src/sv";

// Instanciate SV Class
const file = new SV();

/**
 * Testing IO (Input/Output)
 */
describe("testing IO", () => {
  /**
   * Test that file is read, parsed and tested against the
   * corresponds to existing mock json
   */
  test("open, read & to json", async () => {
    await file.read("./test.csv", ",").then((result) => {
      const json = JSON.stringify(result.object, null, 2);
      expect(json).toBe(mock);
    });
  });
});
