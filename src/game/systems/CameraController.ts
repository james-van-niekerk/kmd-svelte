import { Scene } from 'phaser';
import { MAP_CONFIG } from '../config/GameConfig';
import { type CursorKeys } from '../types/GameTypes';

export class CameraController {
    private scene: Scene;
    private camera: Phaser.Cameras.Scene2D.Camera;
    private cursors: CursorKeys | null = null;
    private isDragging: boolean = false;
    private lastPointerPosition: { x: number; y: number } = { x: 0, y: 0 };

    constructor(scene: Scene) {
        this.scene = scene;
        this.camera = scene.cameras.main;
        this.setupCamera();
        this.setupControls();
        this.setupInteraction();
    }

    private setupCamera() {
        const { MIN_X, MIN_Y, MAX_X, MAX_Y } = MAP_CONFIG.CAMERA_BOUNDS;
        this.camera.setBounds(MIN_X, MIN_Y, MAX_X, MAX_Y);
        this.camera.setZoom(MAP_CONFIG.CAMERA_ZOOM.DEFAULT);
    }

    private setupControls() {
        if (this.scene.input.keyboard) {
            this.cursors = {
                W: this.scene.input.keyboard.addKey('W'),
                A: this.scene.input.keyboard.addKey('A'),
                S: this.scene.input.keyboard.addKey('S'),
                D: this.scene.input.keyboard.addKey('D')
            };
        }
    }

    private setupInteraction() {
        this.setupDragControls();
        this.setupZoomControls();
    }

    private setupDragControls() {
        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.isDragging = true;
            this.lastPointerPosition = { x: pointer.x, y: pointer.y };
        });

        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (this.isDragging) {
                const deltaX = pointer.x - this.lastPointerPosition.x;
                const deltaY = pointer.y - this.lastPointerPosition.y;

                this.camera.scrollX -= deltaX / this.camera.zoom;
                this.camera.scrollY -= deltaY / this.camera.zoom;

                this.lastPointerPosition = { x: pointer.x, y: pointer.y };
            }
        });

        this.scene.input.on('pointerup', () => {
            this.isDragging = false;
        });
    }

    private setupZoomControls() {
        this.scene.input.on('wheel', (pointer: any, gameObjects: any, deltaX: number, deltaY: number) => {
            const zoomDelta = -deltaY * 0.001;
            const newZoom = Phaser.Math.Clamp(
                this.camera.zoom + zoomDelta,
                MAP_CONFIG.CAMERA_ZOOM.MIN,
                MAP_CONFIG.CAMERA_ZOOM.MAX
            );
            this.camera.setZoom(newZoom);
        });
    }

    update() {
        if (this.cursors) {
            if (this.cursors.W.isDown) {
                this.camera.scrollY -= MAP_CONFIG.CAMERA_SPEED;
            }
            if (this.cursors.S.isDown) {
                this.camera.scrollY += MAP_CONFIG.CAMERA_SPEED;
            }
            if (this.cursors.A.isDown) {
                this.camera.scrollX -= MAP_CONFIG.CAMERA_SPEED;
            }
            if (this.cursors.D.isDown) {
                this.camera.scrollX += MAP_CONFIG.CAMERA_SPEED;
            }
        }
    }
}