var Department = /** @class */ (function () {
    function Department(n) {
        this.name = n;
    }
    Department.prototype.mostrar = function () {
        console.log("resultado " + this.name);
    };
    return Department;
}());
var prueba = new Department(" amigo");
console.log(prueba);
prueba.mostrar();
