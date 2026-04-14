export function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentValue = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes && char === '"' && nextChar === '"') {
      currentValue += '"';
      i++; // Skip the next quote
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (!inQuotes && char === ',') {
      currentRow.push(currentValue.trim());
      currentValue = "";
    } else if (!inQuotes && (char === '\n' || char === '\r')) {
      if (char === '\r' && nextChar === '\n') {
        i++; // Handle CRLF
      }
      currentRow.push(currentValue.trim());
      rows.push(currentRow);
      currentRow = [];
      currentValue = "";
    } else {
      currentValue += char;
    }
  }

  // Push the final value and row if the CSV doesn't end with a newline
  if (currentValue !== "" || currentRow.length > 0) {
    currentRow.push(currentValue.trim());
    rows.push(currentRow);
  }

  return rows;
}

export async function fetchAndParseCSV(url, type) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    
    // Get all rows using the robust parser
    const allRows = parseCSV(text);
    
    // Skip header row
    const dataRows = allRows.slice(1);
    
    const parsedData = [];
    dataRows.forEach(parts => {
      // Basic check for empty rows
      if (parts.length === 0 || (parts.length === 1 && parts[0] === "")) return;
      
      if (type === 'machines') {
        parsedData.push({
          id: parts[0] || '',
          name: parts[1] || '',
          capacity: parts[2] || '',
          price: parts[3] || '',
          paragraph: parts[4] || '',
          image: parts[5] || '',
          video: parts[6] || ''
        });
      } else if (type === 'dossier') {
        // Warehouse & Location: col 0 = Image URL, col 1 = Description
        parsedData.push({
          image: parts[0] || '',
          description: parts[1] || ''
        });
      }
    });

    return parsedData;
  } catch (err) {
    console.error(`Could not fetch data for ${type}:`, err);
    return [];
  }
}
