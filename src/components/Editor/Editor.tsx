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
    console.log('setSpouse', nodeId, spouseId);

    setRelations((prevRel) => {
      const newRel = { ...prevRel };
      const node = newRel[nodeId];
      const spouse = newRel[spouseId];

      node.spouses[0] = { type: RelType.married, id: spouseId };
      spouse.spouses[0] = { type: RelType.married, id: nodeId };

      return newRel;
    });
  };

  const addChild = (nodeId: string, childId: string) => {
    console.log('addChild', nodeId, childId);

    setRelations((prevRel) => {
      const newRel = { ...prevRel };
      const node = newRel[nodeId];
      const spouseId = node.spouses[0]?.id;
      const spouse = newRel[spouseId];
      const child = newRel[childId];

      child.siblings = [...prevRel[nodeId].children];

      for (const { id } of node.children) {
        const sibling = prevRel[id];
        sibling.siblings.push({ type: RelType.blood, id: childId });
      }

      node.children.push({ type: RelType.blood, id: childId });
      child.parents.push({ type: RelType.blood, id: nodeId });

      if (spouse) {
        spouse.children.push({ type: RelType.blood, id: childId });
        child.parents.push({ type: RelType.blood, id: spouseId });
      }

      return newRel;
    });
  };

  const exportRel = () => {
    downloadJSON(Object.values(relations));
  };

  return (
    <div className={classes.main}>
      <button onClick={() => exportRel()} className={classes.export}>
        Экспорт
      </button>
      <div className={classes.nodes}>
        {nodesData.map((node) => (
          <EditorNode
            key={node.id}
            id={node.id}
            relations={relations}
            onSpouseChange={setSpouse}
            onChildAdd={addChild}
          />
        ))}
      </div>
    </div>
  );
};

const downloadJSON = (data: any) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute('href', dataStr);
  dlAnchorElem.setAttribute('download', 'relations.json');
  dlAnchorElem.click();
};
