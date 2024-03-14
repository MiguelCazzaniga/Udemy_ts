"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department2 = (function () {
    function Department2(n) {
        this.employees = [];
        this.name = n;
    }
    Department2.prototype.describe = function () {
        console.log("Department: " + this.name);
    };
    Department2.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department2.prototype.printEmployeeInformation = function () {
        console.log("Empployee information");
        console.log(this.employees.length);
        console.log(this.employees);
    };
    return Department2;
}());
var accounting = new Department2("Accounting");
var accountingCopy = { name: "Tato", describe: accounting.describe };
accounting.addEmployee("pepe");
accounting.addEmployee("cacho");
console.log("instancia: ", accounting);
accounting.describe();
accounting.printEmployeeInformation();
var ITDepartment = (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(name, admins) {
        var _this = _super.call(this, name) || this;
        _this.admins = admins;
        return _this;
    }
    return ITDepartment;
}(Department2));
var AccountingDepartment = (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment(name, reports) {
        var _this = _super.call(this, name) || this;
        _this.reports = [];
        return _this;
    }
    AccountingDepartment.prototype.addReports = function (text) {
        this.reports.push(text);
    };
    AccountingDepartment.prototype.printReports = function () {
        console.log(this.reports);
    };
    return AccountingDepartment;
}(Department2));
var itDepartment = new ITDepartment("It department", ["esteban"]);
var accounting2 = new AccountingDepartment("Accounting Dep", ["pirulin"]);
accounting2.addReports("Sonamos...");
accounting2.printReports();
console.log(itDepartment);
