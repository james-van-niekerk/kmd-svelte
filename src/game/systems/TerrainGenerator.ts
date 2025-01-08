import { type Tile } from '../types/GameTypes';
import { MAP_CONFIG } from '../config/GameConfig';

export class TerrainGenerator {
    static generateMap(): Tile[][] {
        const mapData: Tile[][] = [];

        for (let y = 0; y < MAP_CONFIG.MAP_HEIGHT; y++) {
            const row: Tile[] = [];
            for (let x = 0; x < MAP_CONFIG.MAP_WIDTH; x++) {
                row.push({
                    type: Phaser.Math.Between(0, 2),
                    elevation: Phaser.Math.Between(0, 2)
                });
            }
            mapData.push(row);
        }

        return mapData;
    }
}
