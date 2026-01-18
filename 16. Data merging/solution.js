function reconcile(newItem, oldItem) {
  let i = 0;
  let j = 0;
  const newEquip = [];

  while (i<newItem.equipment.length && j<oldItem.equipment.length) {
    if(newItem.equipment[i] < oldItem.equipment[j]) {
      newEquip.push(newItem.equipment[i]);
      i++;
    } else if (newItem.equipment[i] > oldItem.equipment[j]) {
      newEquip.push(oldItem.equipment[j]);
      j++;
    } else {
      newEquip.push(oldItem.equipment[j]);
      j++;
      i++;
    }
  }

  while(i<newItem.equipment.length) {
    newEquip.push(newItem.equipment[i]);
    i++;
  }

  while (j<oldItem.equipment.length) {
    newEquip.push(oldItem.equipment[j]);
    j++;
  }

  return {
    user: newItem.user;
    duration: (newItem.duration + oldItem.duration),
    equipment: newEquip
  }
}

/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @return {Array}
 */
export default function mergeData(sessions) {
  const map = new Map();
  const result = [];

  sessions.forEach((item) => {
    const { user } = item;
    if (map.has(user)) {
      const idx = map.get(user);
      const newVal = reconcile(item, result[idx]);
      result[idx] = newVal;
    }
    else {
      result.push(item);
      map.set(user, result.length-1);
    }
  });

  return result;
}
