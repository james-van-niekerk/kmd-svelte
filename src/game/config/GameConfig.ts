export const MAP_CONFIG = {
    TILE_WIDTH: 64,
    TILE_HEIGHT: 32,
    MAP_WIDTH: 20,
    MAP_HEIGHT: 20,
    CAMERA_SPEED: 10,
    CAMERA_BOUNDS: {
        MIN_X: -1000,
        MIN_Y: -1000,
        MAX_X: 2000,
        MAX_Y: 2000
    },
    CAMERA_ZOOM: {
        DEFAULT: 1.0,
        MIN: 0.5,
        MAX: 2.0
    }
} as const;

export const TERRAIN_COLORS = {
    GRASS: 0x008000,
    DIRT: 0x964B00,
    STONE: 0x808080
} as const;