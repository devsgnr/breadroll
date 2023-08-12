export type ObjectType = {
  [key: string]: string | unknown;
};

export type DFExtractedData = {
  metadata: ObjectType;
  filters: {
    [key: string]: Array<string>;
  };
  data: Array<ObjectType>;
};
