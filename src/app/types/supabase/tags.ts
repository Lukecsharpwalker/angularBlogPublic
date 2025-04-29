export type Tag = {
  color: string;
  icon: string;
  id: number;
  name: string;
};

export type TagInsert = {
  color: string;
  icon: string;
  id?: number;
  name: string;
};

export type TagUpdate = {
  color?: string;
  icon?: string;
  id?: number;
  name?: string;
};

export type TagRelationships = [];
