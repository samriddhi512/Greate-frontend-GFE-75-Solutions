import { useState, useId } from "react";

const DEFAULT_ITEMS_LEFT = ["HTML", "JavaScript", "CSS", "TypeScript"];
const DEFAULT_ITEMS_RIGHT = ["React", "Angular", "Vue", "Svelte"];

function generateItemsMap(items) {
  // map expects [["React", false], [key, value]]
  return new Map(items.map((item) => [item, false]));
}

function Checkbox({ name, checked, onChange }) {
  const id = useId();
  // any internal state here will be wrongly mapped if we use changing key (say idx)
  // const [label, setLabel] = useState(name);
  return (
    <li key={id}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label for={id}>{name}</label>
    </li>
  );
}

function List({ list, setList }) {
  return (
    <div className="transfer-list__section">
      <ul className="transfer-list__section__items">
        {Array.from(list.entries()).map(([name, checked], idx) => {
          return (
            <Checkbox
              // remember to use key here
              // key should not be idx, as idx will be changing often. React can preserve state wrongly!
              // key={idx}
              key={name}
              name={name}
              checked={checked}
              onChange={() => {
                const newList = new Map(list);
                newList.set(name, !checked);
                setList(newList);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default function App() {
  const [leftList, setLeftList] = useState(
    generateItemsMap(DEFAULT_ITEMS_LEFT),
  );
  const [rightList, setRightList] = useState(
    generateItemsMap(DEFAULT_ITEMS_RIGHT),
  );

  function transferAllItems(srcList, dstList, setSrcList, setDstList) {
    setDstList(new Map([...srcList, ...dstList]));
    setSrcList(new Map([]));
  }

  function hasSelectedItems(list) {
    return Array.from(list.values()).filter((val) => val).length;
  }

  function transferSelectedItems(srcList, dstList, setSrcList, setDstList) {
    const newSrcList = new Map(srcList);
    const newDstList = new Map(dstList);

    // iterate over src key just once
    // do not mutate state directly
    srcList.forEach((val, key) => {
      if (!val) return;

      newDstList.set(key, val);
      newSrcList.delete(key);
    });

    setSrcList(newSrcList);
    setDstList(newDstList);
  }

  return (
    <div className="transfer-list">
      <List list={leftList} setList={setLeftList} />
      <div className="transfer-list__actions">
        <button
          aria-label="Transfer all items to left list"
          disabled={rightList.length === 0}
          onClick={() => {
            transferAllItems(rightList, leftList, setRightList, setLeftList);
          }}
        >
          {/* make aria-hidden to avoid screen reader from reading lesser than, desc already added in button */}
          <span aria-hidden={true}>{"<<"}</span>
        </button>

        <button
          aria-label="Transfer selected items to left list"
          disabled={!hasSelectedItems(rightList)}
          onClick={() => {
            transferSelectedItems(
              rightList,
              leftList,
              setRightList,
              setLeftList,
            );
          }}
        >
          <span aria-hidden={true}>&lt;</span>
        </button>

        <button
          aria-label="Transfer selected items to right list"
          disabled={!hasSelectedItems(leftList)}
          onClick={() => {
            transferSelectedItems(
              leftList,
              rightList,
              setLeftList,
              setRightList,
            );
          }}
        >
          <span aria-hidden={true}>{">"}</span>
        </button>

        <button
          aria-label="Transfer all items to right list"
          disabled={leftList.length === 0}
          onClick={() =>
            transferAllItems(leftList, rightList, setLeftList, setRightList)
          }
        >
          <span aria-hidden={true}>{">>"}</span>
        </button>
      </div>
      <List list={rightList} setList={setRightList} />
    </div>
  );
}
