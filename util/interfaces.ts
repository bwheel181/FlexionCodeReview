import { ShapeType } from './types';

export interface Side {
    length: number;
}

export interface Shape {
    getShapeType: () => ShapeType;
}
