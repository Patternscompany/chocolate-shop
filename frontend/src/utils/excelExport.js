import * as XLSX from 'xlsx';

export const generateEstimateWorkbook = (estimateData, selectedPackage, calculations) => {
  const workbook = XLSX.utils.book_new();
  
  const breakdown = [
    ['Interior Design Estimate'],
    [],
    ['Project Details'],
    ['Apartment Type', estimateData.apartmentType],
    ['Carpet Area', `${estimateData.carpetArea} sq ft`],
    ['Package Selected', selectedPackage.name],
    ['Modular Kitchen', estimateData.modularKitchen ? 'Yes' : 'No'],
    [],
    ['Selected Rooms'],
    ...estimateData.bedrooms.map(room => [room]),
    [],
    ['Cost Breakdown'],
    ['Category', 'Percentage', 'Amount'],
    ...calculations
  ];

  const ws = XLSX.utils.aoa_to_sheet(breakdown);
  XLSX.utils.book_append_sheet(workbook, ws, 'Estimate');
  
  return workbook;
};

export const downloadWorkbook = (workbook, filename) => {
  XLSX.writeFile(workbook, filename);
};