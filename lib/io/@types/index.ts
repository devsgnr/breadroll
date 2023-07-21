export interface IOSave {
  as: {
    json: () => Promise<number>;
  };
}
