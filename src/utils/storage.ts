export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`swa_halimo_${key}`);
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn(`Error reading localStorage key ${key}:`, err);
  }
  return defaultValue;
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`swa_halimo_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing to localStorage key ${key}:`, err);
  }
}
