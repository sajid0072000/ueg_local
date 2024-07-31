export function convertToCSV(data: any[]): string {
  if (!data || !data.length) {
    return '';
  }

  const separator = ',';
  const keys = Object.keys(data[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    data.map(item => {
      return keys.map(k => {
        let cell = item[k];
        cell = cell === null || cell === undefined ? '' : cell;
        cell = cell instanceof Date ? cell.toISOString() : cell.toString().replace(/"/g, '""');
        if (cell.search(/("|,|\n)/g) >= 0) {
          cell = `"${cell}"`;
        }
        return cell;
      }).join(separator);
    }).join('\n');

  return csvContent;
}
