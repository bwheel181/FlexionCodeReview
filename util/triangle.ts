/*
  inputs:
    side1: int
    side2: int
    side3: int
    
  outputs:
    isosceles
    scalene
    equilateral
    not a triangle
    
  processing:
    We can classify a triangle based on the following geometrical assumptions...
    # if side1 is the same length as side2 and side2 is not the same length as side3 = isosceles
    # if side1 does not equal side2 and side2 does not equal side3 and side3 does not equal side1 = scalene
    # if side1 is equal to side2 and side2 is equal to side = equilateral
    
    # if all sides are equal, we can exit immediatly with the result of equilateral
    # else if two sides are equal and the triangle is still a valide triangle we can exit with isosceles
    # else if the shape is still a triangle we can exit with scalene
    # else we can exit with not a triangle
    
  First we will create a namespace for our shapes with abstract definitions to keep our code extendible
  and flexible. Then we will define a function to determine if a shape can be a triangle. 
*/
import { Side, Shape } from './interfaces';
import { ShapeType } from './types';

export default class Triangle implements Shape {
    private sides: Side[];
    
    constructor(sides: Side[]) {
        this.sides = sides;
        if (!isTriangle(sides)) {
            throw new Error('Shape cannot be a triangle');
        }
    }
    
    public getShapeType(): ShapeType {
        if (this.sides[0].length === this.sides[1].length && this.sides[1].length === this.sides[2].length) {
            return ShapeType.EquilateralTriangle;
        } else if (this.sides[0].length === this.sides[1].length || this.sides[1].length === this.sides[2].length) {
            return ShapeType.IsoscelesTriangle;
        } else {
            return ShapeType.ScaleneTriangle;
        }
    }
}

function isTriangle(sides: Side[]): boolean {
    if (sides.length !== 3) {
        return false;
    }
    const valid1 = sides[0].length + sides[1].length > sides[2].length;
    const valid2 = sides[1].length + sides[2].length > sides[0].length;
    const valid3 = sides[2].length + sides[1].length > sides[2].length;
    return valid1 && valid2 && valid3;
}
