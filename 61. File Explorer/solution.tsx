import { React, useState } from "react";

type Item = {
  id: number;
  name: string;
  children?: Item[];
};

function FileObject({ item }: { item: Item }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleClick() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <div>
      <span>{item.name}</span>
      {!!item.children && (
        <button onClick={toggleClick}>{isExpanded ? "-" : "+"}</button>
      )}

      {!!item.children && isExpanded && <FileList data={item.children} />}
    </div>
  );
}
function FileList({ data }: { data: Item[] }) {
  const directories = data.filter((item) => !!item.children);
  const files = data.filter((item) => !item.children);
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const items = [...directories, ...files];
  return (
    <div className="list-container">
      {items.map((item) => {
        return <FileObject key={item.id} item={item} />;
      })}
    </div>
  );
}
export default function FileExplorer({ data }: { data: Item[] }) {
  return (
    <div>
      <FileList data={data} />
    </div>
  );
}
