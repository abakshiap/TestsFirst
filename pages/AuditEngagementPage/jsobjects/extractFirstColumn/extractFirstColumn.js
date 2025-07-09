export default {
  extractedIds: [], // store here for reuse

  extractFirstColumn() {
    try {
      if (!FilePicker1.files || FilePicker1.files.length === 0) {
        throw new Error("No file uploaded.");
      }

      const base64Data = FilePicker1.files[0].data;
      if (!base64Data) throw new Error("Missing base64 data.");

      const decoded = atob(base64Data.split(",")[1]);
      const lines = decoded.trim().split("\n");
      const delimiter = lines[0].includes("\t") ? "\t" : ",";

      const ids = lines.slice(1).map(line => line.split(delimiter)[0]?.trim()).filter(Boolean);
      this.extractedIds = ids;
      console.log("Extracted Vanta IDs:", ids);
      return ids;

    } catch (error) {
      console.error("Failed to extract IDs:", error);
      return [];
    }
  }
}
