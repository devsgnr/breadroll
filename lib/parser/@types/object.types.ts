export type ObjectType = {
  [key: string]: string | unknown;
};

export type SVExtractedData = {
  metadata: ObjectType;
  filters: {
    [key: string]: Array<string>;
  };
  data: Array<ObjectType>;
};
