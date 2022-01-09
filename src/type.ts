export type Relation = Readonly<{
  id: string;
  type: RelType;
}>;
export type TreeNode = Readonly<{
  id: string;
  parents: Relation[];
  children: Relation[];
  siblings: Relation[];
  spouses: Relation[];
  placeholder?: boolean;
}>;

export enum RelType {
  blood = 'blood',
  married = 'married',
  divorced = 'divorced',
  adopted = 'adopted',
  half = 'half',
}

export type TreeNodeMap = Record<string, TreeNode>;
