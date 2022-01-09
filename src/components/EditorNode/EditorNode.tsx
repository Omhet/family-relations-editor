import { ALL_NODES_IDS } from '@components/data';
import React, { FC } from 'react';
import { TreeNodeMap } from '../../type';
import s from './EditorNode.module.scss';

export interface EditorNodeProps {
  id: string;
  relations: TreeNodeMap;
  onSpouseChange: (nodeId: string, spouseId: string) => void;
}

export const EditorNode: FC<EditorNodeProps> = ({ id, relations, onSpouseChange }) => {
  const spouses = relations[id]?.spouses ?? {};

  return (
    <div className={s.main}>
      <div className={s.nodeId}>{id}</div>
      <label>
        <span>Супруг(а): </span>
        <select onChange={(e) => onSpouseChange(id, e.target.value)} value={spouses[0]?.id} className={s.spouse}>
          {ALL_NODES_IDS.map((id) => (
            <option value={id} key={id}>
              {id}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
