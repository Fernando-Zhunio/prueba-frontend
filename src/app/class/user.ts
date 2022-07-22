export class User {
  id?: number;
  name?:string;
  email?:string;
  permissions?:any[];

  constructor(id: number, name:string, email:string, permissions:any[] = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.permissions = permissions;
  }

}
