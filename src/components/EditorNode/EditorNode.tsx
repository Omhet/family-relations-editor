import { ALL_NODES_IDS } from '@components/data';
import React, { FC, useState } from 'react';
import { TreeNodeMap } from '../../type';
import s from './EditorNode.module.scss';

export interface EditorNodeProps {
  id: string;
  relations: TreeNodeMap;
  onSpouseChange: (nodeId: string, spouseId: string) => void;
  onChildAdd: (nodeId: string, childId: string) => void;
}

export const EditorNode: FC<EditorNodeProps> = ({ id, relations, onSpouseChange, onChildAdd }) => {
  const spouses = relations[id]?.spouses ?? [];
  const children = relations[id]?.children ?? [];
  const siblings = relations[id]?.siblings ?? [];

  const ids = ALL_NODES_IDS.filter((nodeId) => nodeId !== id);

  const [childId, setChildId] = useState<string>(ids[0]);
  const [spouseId, setSpouseId] = useState<string>(ids[0]);

  return (
    <div className={s.main}>
      <div className={s.nodeId}>{id}</div>
      <label>
        <div>
          <span>Выбор Супруг(а): </span>
          <select onChange={(e) => setSpouseId(e.target.value)} value={spouseId} className={s.spouseSelect}>
            {ids.map((id) => (
              <option value={id} key={id}>
                {id}
              </option>
            ))}
          </select>
          <button onClick={() => onSpouseChange(id, spouseId)}>Выбрать</button>
        </div>
        <div>Супруг(а): {spouses[0]?.id}</div>
      </label>

      <label>
        <span>Дети: </span>
        <select onChange={(e) => setChildId(e.target.value)} value={childId} className={s.childSelect}>
          {ids.map((id) => (
            <option value={id} key={id}>
              {id}
            </option>
          ))}
        </select>
        <button onClick={() => onChildAdd(id, childId)}>Добавить</button>

        <ul>
          {children.map((node) => (
            <li key={node.id}>{node.id}</li>
          ))}
        </ul>
      </label>

      <label>
        <span>Братья/Сестры:</span>
        <ul>
          {siblings.map((node) => (
            <li key={node.id}>{node.id}</li>
          ))}
        </ul>
      </label>
    </div>
  );
};
