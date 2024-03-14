class Department {
  name: string

  constructor(n: string) {
    this.name = n
  }
  mostrar() {
    console.log("resultadote " + this.name)
  }
}

const prueba = new Department(" amigo")

console.log(prueba)
prueba.mostrar()
