export type IOSave = {
  json: (location: string) => Promise<number>;
  csv: (location: string) => Promise<number>;
  tsv: (location: string) => Promise<number>;
};
