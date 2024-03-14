class Department{
    name:string;

    constructor(n:string){
        this.name=n
    }
mostrar(){
    console.log("resultado "+this.name)
}
}

const prueba=new Department(" amigo")

console.log(prueba)
prueba.mostrar()