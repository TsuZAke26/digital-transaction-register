import Papa from 'papaparse';

// https://stackoverflow.com/questions/31375531/how-to-use-promises-with-papaparse
export async function importTransactionCSV(file: File) {
  return new Promise(function (complete, error) {
    Papa.parse(file, {
      worker: true,
      header: true,
      columns: ['category', 'date', 'name', 'amount'],
      dynamicTyping: true,
      complete,
      error
    });
  });
}
