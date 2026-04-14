export function parseCSVLine(str) {
  let inQuotes = false;
  let items = [];
  let currentVal = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '"' && str[i+1] === '"') {
      currentVal += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      items.push(currentVal.trim());
      currentVal = "";
    } else {
      currentVal += char;
    }
  }
  items.push(currentVal.trim());
  return items;
}

export async function fetchAndParseCSV(url, type) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const lines = text.trim().split('\n').slice(1);
    
    const parsedData = [];
    lines.forEach(line => {
      if (!line.trim()) return;
      const parts = parseCSVLine(line);
      
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
