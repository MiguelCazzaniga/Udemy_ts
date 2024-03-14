// 1 Definir la clase
class Department2 {
  readonly name: string // fija el valor desde la inicializacion - solo funciona en typescript
  private employees: string[] = [] // private determina que la variable solamente es accesible a traves de
  // los metodos del objeto instanciado - solo funciona en type script

  //constructor: permite crear instancias con un método

  constructor(n: string) {
    this.name = n
  }

  //metodo
  describe(this: Department2) {
    console.log("Department: " + this.name)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log("Empployee information")
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

//2 Crear una instancia y guardarla en una constante

const accounting = new Department2("Accounting")

//3 crear un objeto a partir del metodo
const accountingCopy = { name: "Tato", describe: accounting.describe }
// acciones internas con los metodos
accounting.addEmployee("pepe")
accounting.addEmployee("cacho")
// ver resultados en consola
console.log("instancia: ", accounting)
accounting.describe()
accounting.printEmployeeInformation()

//accountingCopy.describe() esta coementada porque no repeta la estrctura de datos de la clase

//Crear sub clase y heredar
class ITDepartment extends Department2 {
  admins: string[]
  //agregar constructor a la subclase
  constructor(name: string, admins: string[]) {
    super(name) // name lo usa el padre
    this.admins = admins
  }
}

class AccountingDepartment extends Department2{
    private reports:string[]=[]
    constructor(name:string, reports:string[]){
        super(name)       
    }

    addReports(text:string){
        this.reports.push(text)
    }

    printReports(){
        console.log(this.reports)
    }
}
//instanciar la subclase
const itDepartment = new ITDepartment("It department", ["esteban"])
const accounting2=new AccountingDepartment("Accounting Dep",["pirulin"])

//usar los métodos de la subclase
accounting2.addReports("Sonamos...")
accounting2.printReports()

//ver la subclase
console.log(itDepartment)
