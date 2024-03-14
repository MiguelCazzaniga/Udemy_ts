"use strict";
var user1;
user1 = {
    name: "Miguel",
    age: 30,
    greet: function (phrase) {
        console.log(phrase + " " + this.name);
    }
};
user1.greet("hola");
