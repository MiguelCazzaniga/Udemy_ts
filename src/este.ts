// interface
// Describes the structure of objects
// interface can not have an initializer
// Interfaces do not describe the object complete  structure.
// But ensures that the described element are part of the object.
// An object coud reflect more than one interface on its structure
// there are ways to make elements not mandatories (?) adding a questionb mark ot them

interface Person{
    name:string;
    age:number;

    greet(phrase:string):void
}

let user1:Person

user1={
    name:"Miguel",
    age:30,
    greet(phrase:string){
        console.log(phrase+" "+this.name)
    }
}

user1.greet("hola")