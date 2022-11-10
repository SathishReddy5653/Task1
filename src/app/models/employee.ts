export interface Employee {
    id:number | null,
    name:string,
    age:number,
    country:string,
    salary:number
}

export interface ProductResolved {
    employee: Employee | null;
    error?: string;
  }