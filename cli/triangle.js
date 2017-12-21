"use strict";
exports.__esModule = true;
var Triangle = /** @class */ (function () {
    function Triangle(sides) {
        this.sides = sides;
        if (!isTriangle(sides)) {
            throw new Error('Shape cannot be a triangle');
        }
    }
    Triangle.prototype.getShapeType = function () {
        if (this.sides[0].length === this.sides[1].length && this.sides[1].length === this.sides[2].length) {
            return "Triangle:Equilateral" /* EquilateralTriangle */;
        }
        else if (this.sides[0].length === this.sides[1].length || this.sides[1].length === this.sides[2].length) {
            return "Triangle:Isosceles" /* IsoscelesTriangle */;
        }
        else {
            return "Triangle:Scalene" /* ScaleneTriangle */;
        }
    };
    return Triangle;
}());
exports["default"] = Triangle;
function isTriangle(sides) {
    if (sides.length !== 3) {
        return false;
    }
    var valid1 = sides[0].length + sides[1].length > sides[2].length;
    var valid2 = sides[1].length + sides[2].length > sides[0].length;
    var valid3 = sides[2].length + sides[1].length > sides[2].length;
    return valid1 && valid2 && valid3;
}
