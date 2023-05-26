import fsp from 'fs/promises';

export async function readJson(filePath: string): Promise<any> {
  try {
    const rawData = await fsp.readFile(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading JSON file: ${filePath}`, error);
    throw error;
  }
}