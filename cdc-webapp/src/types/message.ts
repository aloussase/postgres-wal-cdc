export type Message = {
  kind: string;
  table: string;
  columns: string[];
  types: string[];
  values: any[];
};
