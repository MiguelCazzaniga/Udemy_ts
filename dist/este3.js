"use strict";
var Department = (function () {
    function Department(n) {
        this.name = n;
    }
    Department.prototype.mostrar = function () {
        console.log("resultadote " + this.name);
    };
    return Department;
}());
var prueba = new Department(" amigo");
console.log(prueba);
prueba.mostrar();
