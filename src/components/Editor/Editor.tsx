import { EditorNode } from '@components/EditorNode/EditorNode';
import React, { FC, useState } from 'react';
import { RelType, TreeNodeMap } from 'type';
import nodesData from '../data/nodes.json';
import classes from './Editor.module.scss';

const nodesDataRelMap: TreeNodeMap = Object.fromEntries(
  nodesData.map((node) => {
    return [
      node.id,
      {
        id: node.id,
        parents: [],
        siblings: [],
        spouses: [],
        children: [],
      },
    ];
  })
);

export interface EditorProps {}

export const Editor: FC<EditorProps> = ({}) => {
  const [relations, setRelations] = useState<TreeNodeMap>(() => nodesDataRelMap);

  const setSpouse = (nodeId: string, spouseId: string) => {
    setRelations((prevRel) => {
      const newRel = { ...prevRel };
      const node = newRel[nodeId];
      const spouse = newRel[spouseId];

      node.spouses.push({ type: RelType.married, id: spouseId });
      spouse.spouses.push({ type: RelType.married, id: nodeId });

      return newRel;
    });
  };

  return (
    <div className={classes.main}>
      <button className={classes.export}>Экспорт</button>
      <div className={classes.nodes}>
        {nodesData.map((node) => (
          <EditorNode key={node.id} id={node.id} relations={relations} onSpouseChange={setSpouse} />
        ))}
      </div>
    </div>
  );
};
