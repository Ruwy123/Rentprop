export function convertToSerializableObject(leanDocument) {
  if (!leanDocument || typeof leanDocument !== "object") return leanDocument;

  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key]; // ✅ define 'value' before using it

    // ✅ Handle nested objects recursively
    if (value && typeof value === "object" && !Array.isArray(value)) {
      leanDocument[key] = convertToSerializableObject(value);
    }
    // ✅ Only convert if the field has both .toJSON and .toString
    else if (
      value &&
      typeof value.toJSON === "function" &&
      typeof value.toString === "function"
    ) {
      leanDocument[key] = value.toString();
    }
  }

  return leanDocument;
}
