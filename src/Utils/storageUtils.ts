export const setLocalStorageData = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error while setting data in local storage:", error);
  }
};

export const getLocalStorageData = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return null;
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error("Error while getting data from local storage:", error);
    return null;
  }
};

export const deleteLocalStorageData = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error while deleting data from local storage:", error);
  }
};
