const ExcelJS = require('exceljs')

async function generateExcel(data, filePath) {
  const workbook = new ExcelJS.Workbook()

  const sheet = workbook.addWorksheet('CUSDEC Report')

  // ===== Report Header =====
  sheet.mergeCells('A1:K1')
  sheet.getCell('A1').value = 'GERMTON VIETNAM'

  sheet.mergeCells('A2:K2')
  sheet.getCell('A2').value = 'GI Sales Shpt Amt vs CUSDEC Amt Discrepencies'

  sheet.mergeCells('A3:K3')
  sheet.getCell('A3').value = `Generated At: ${new Date().toLocaleString()}`

  // Title style
  sheet.getCell('A1').font = {
    bold: true,
    size: 18,
  }

  sheet.getCell('A2').font = {
    bold: true,
    size: 14,
  }

  sheet.getCell('A3').font = {
    italic: true,
    size: 10,
  };

  ['A1', 'A2', 'A3'].forEach((cellAddress) => {
    sheet.getCell(cellAddress).alignment = {
      horizontal: 'center',
      vertical: 'middle',
    }
  })

  // ===== Table Header =====
  const headerRowNumber = 5

  // Create a blank line so the header is on line 5.
  sheet.addRow([])
  sheet.addRow([])

  // Create header
  sheet.getRow(headerRowNumber).values = [
    'Date',
    'Type',
    'Customer',
    'Sales Shipment No.',
    'CUSDEC Amt',
    'Invoice Amt',
    'Discrepancy',
    'CUSDEC No.',
    'Invoice No.',
    'Packlist No.',
    'Shipment Type',
  ]

  // Set width column
  sheet.columns = [
    { key: 'Date', width: 13 },
    { key: 'Type', width: 20 },
    { key: 'Cust Name', width: 20 },
    { key: 'Sales Shpt No.', width: 22 },
    { key: 'CUSDEC Amt', width: 18 },
    { key: 'Inv Amt', width: 18 },
    { key: 'Discrepancy', width: 18 },
    { key: 'CUSDEC No.', width: 20 },
    { key: 'Inv No.', width: 20 },
    { key: 'Packlist No.', width: 20 },
    { key: 'Shpt Type', width: 15 },
  ]

  // Add Data
  data.forEach((row) => {
    sheet.addRow(row)
  })

  // ===== Header Style =====
  const headerRow = sheet.getRow(headerRowNumber)

  headerRow.height = 25

  headerRow.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: {
        argb: 'FFFFFF',
      },
    }

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {
        argb: '1F4E78',
      },
    }

    cell.alignment = {
      horizontal: 'center',
      vertical: 'middle',
    }

    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
  })

  // ===== Data Style =====
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber <= headerRowNumber) return

    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    });

    // Format money
    [5, 6, 7].forEach((col) => {
      row.getCell(col).numFmt = '#,##0.00'
    })

    // Highlight discrepancy
    const discrepancy = Number(row.getCell(7).value || 0)

    if (Math.abs(discrepancy) > 0) {
      row.getCell(7).font = {
        bold: true,
        color: {
          argb: 'FF0000',
        },
      }
    }
  })

  // ===== Freeze Header =====
  sheet.views = [
    {
      state: 'frozen',
      ySplit: headerRowNumber,
    },
  ]

  // ===== Auto Filter =====
  sheet.autoFilter = {
    from: {
      row: headerRowNumber,
      column: 1,
    },
    to: {
      row: headerRowNumber,
      column: 11,
    },
  }

  await workbook.xlsx.writeFile(filePath)
}

module.exports = {
  generateExcel,
}
