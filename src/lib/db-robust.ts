import fs from 'fs/promises';
import path from 'path';
import { Pose } from '@/types/database';

const dbPath = path.join(process.cwd(), 'src/lib/poses-db.json');

/**
 * Robust Database Helper for JSON-based storage.
 * Handles atomic writes and simple locking to prevent corruption during parallel requests.
 */
export class PosesDB {
  private static isWriting = false;

  static async read(): Promise<Pose[]> {
    try {
      const data = await fs.readFile(dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to read database:', error);
      return [];
    }
  }

  static async write(poses: Pose[]): Promise<boolean> {
    // Basic spin-lock to prevent concurrent writes
    while (this.isWriting) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    this.isWriting = true;
    try {
      // Write to a temporary file first to ensure atomicity
      const tempPath = `${dbPath}.tmp`;
      await fs.writeFile(tempPath, JSON.stringify(poses, null, 2));
      await fs.rename(tempPath, dbPath);
      return true;
    } catch (error) {
      console.error('Failed to write database:', error);
      return false;
    } finally {
      this.isWriting = false;
    }
  }

  static async updatePose(updatedPose: Pose): Promise<boolean> {
    const poses = await this.read();
    const index = poses.findIndex(p => p.id === updatedPose.id);
    if (index === -1) return false;
    
    poses[index] = updatedPose;
    return await this.write(poses);
  }

  static async addPose(newPose: Pose): Promise<boolean> {
    const poses = await this.read();
    if (poses.find(p => p.id === newPose.id || p.slug === newPose.slug)) return false;
    
    poses.push(newPose);
    return await this.write(poses);
  }
}
