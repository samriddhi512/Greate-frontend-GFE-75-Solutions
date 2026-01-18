export default function getElementsByStyle(element, property, value) {
  const children = element.children;
  if (children.length == 0) return [];

  const res = [];
  for (let i=0;i<children.length;i++) {
    const child = children[i];
    if(window.getComputedStyle(child)[property]=== value ) {
      res.push(child);
    }
    res.push(...getElementsByStyle(child, property, value));
  }

  return res;
}


// IMPORTANT CONCEPT OF using = window.getComputedStyle