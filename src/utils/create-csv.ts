import { Spacecraft } from '../api/types';

export function prepareDataCvs(data: Spacecraft[]): string {
  const tableHead = ['Uid', 'Spacecraft', 'Status', 'Date'];
  let content = `${tableHead.join(',')}\n`;
  const tableRows = data.map((item) => {
    return [item.uid, item.name, item.status, item.dateStatus];
  });

  tableRows.forEach((row) => {
    content += `${row.join(',')}\n`;
  });

  return content;
}

export function createCsv(cardsInfo: Spacecraft[]) {
  const file = new Blob([prepareDataCvs(cardsInfo)], { type: 'text/csv' });

  return URL.createObjectURL(file);
}
