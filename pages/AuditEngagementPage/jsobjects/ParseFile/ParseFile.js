export default {
  extractFirstColumn() {
    try {
      if (!FilePicker1.files || FilePicker1.files.length === 0) {
        throw new Error("No file uploaded.");
      }

      const base64Data = FilePicker1.files[0].data;

      if (!base64Data) {
        throw new Error("Missing base64 file data.");
      }

      // Decode CSV/TSV text
      const decoded = atob(base64Data.split(",")[1]);
      const lines = decoded.trim().split("\n");

      // Detect delimiter from header row
      const delimiter = lines[0].includes("\t") ? "\t" : ",";

      // Extract first column values (skip header)
      const values = lines.slice(1).map(line => {
        const columns = line.split(delimiter);
        return columns[0]?.trim(); // First column
      }).filter(Boolean); // Remove any empty rows

      console.log("🎯 Extracted first column only:", values);
      return values;

    } catch (error) {
      console.error("❌ Error extracting first column:", error);
      return [];
    }
  }
}
