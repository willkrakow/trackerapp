const last = <T>(arr: T[]) => arr[arr.length - 1];

export function findClusters<T>(
  arr: T[],
  groupKey: keyof T
) {
  const clusters: [T[]] = [[]];
  let index = 0;
  let previousDayStatus = arr[0][groupKey];
  while (index < arr.length) {
    const activeItem = arr[index];
    if (activeItem[groupKey] === previousDayStatus) {
      last(clusters).push(activeItem);
    } else {
        const newCluster = [activeItem]
      clusters.push(newCluster);
    }
    previousDayStatus = activeItem[groupKey];
    index = index + 1
  }
}
