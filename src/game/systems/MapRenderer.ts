import { Scene } from 'phaser';
import { type Tile } from '../types/GameTypes';
import { MAP_CONFIG, TERRAIN_COLORS } from '../config/GameConfig';

export class MapRenderer {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    renderMap(mapData: Tile[][]) {
        const originX = this.scene.scale.width / 2;
        const originY = 100;

        for (let sum = 0; sum <= MAP_CONFIG.MAP_WIDTH + MAP_CONFIG.MAP_HEIGHT - 2; sum++) {
            for (let x = 0; x <= sum; x++) {
                const y = sum - x;
                if (y < MAP_CONFIG.MAP_HEIGHT && x < MAP_CONFIG.MAP_WIDTH) {
                    this.renderTile(mapData[y][x], x, y, originX, originY);
                }
            }
        }
    }

    private renderTile(tile: Tile, x: number, y: number, originX: number, originY: number) {
        const screenX = originX + (x - y) * (MAP_CONFIG.TILE_WIDTH / 2);
        const screenY = originY + (x + y) * (MAP_CONFIG.TILE_HEIGHT / 2) - (tile.elevation * 10);

        const tileColor = this.getTileColor(tile.type);
        const shadowOffset = 4;

        // Add shadow
        this.scene.add.rectangle(
            screenX,
            screenY + shadowOffset,
            MAP_CONFIG.TILE_WIDTH,
            MAP_CONFIG.TILE_HEIGHT,
            0x000000,
            0.2
        ).setOrigin(0.5, 0.5);

        // Add main tile
        this.scene.add.rectangle(
            screenX,
            screenY,
            MAP_CONFIG.TILE_WIDTH,
            MAP_CONFIG.TILE_HEIGHT,
            tileColor
        ).setOrigin(0.5, 0.5);
    }

    private getTileColor(type: number): number {
        switch(type) {
            case 0: return TERRAIN_COLORS.GRASS;
            case 1: return TERRAIN_COLORS.DIRT;
            case 2: return TERRAIN_COLORS.STONE;
            default: return TERRAIN_COLORS.GRASS;
        }
    }
}