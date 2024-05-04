import { cloneDeepWith, isObject } from "lodash";

const cloneThenNullify = (obj: Record<string, unknown>): Record<string, unknown> => {
  return cloneDeepWith(obj, (value) => (isObject(value) ? undefined : null));
};

export { cloneThenNullify };
