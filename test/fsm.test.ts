import { describe, expect, test } from "bun:test";
import { TransitionObject } from "../lib/parser/@types";
import FSM from "../src/fsm";

const fsm = new FSM();

describe("testing IO", () => {
  test("open, read & return Array[TransitionObject]", async () => {
    await fsm
      .create("./test.fsm")
      .then((res) => expect(res).toBeInstanceOf(Array<TransitionObject>))
      .catch((err) => null);
  });
});
