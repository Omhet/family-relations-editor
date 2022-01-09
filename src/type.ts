export type Relation = {
  id: string;
  type: RelType;
};

export type TreeNode = {
  id: string;
  parents: Relation[];
  children: Relation[];
  siblings: Relation[];
  spouses: Relation[];
  placeholder?: boolean;
};

export enum RelType {
  blood = 'blood',
  married = 'married',
  divorced = 'divorced',
  adopted = 'adopted',
  half = 'half',
}

export type TreeNodeMap = Record<string, TreeNode>;
