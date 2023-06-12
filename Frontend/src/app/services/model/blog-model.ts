
export interface IBlog {
  id?: string,
  email?: string,
  author?: string,
  content?: string,
  createdAt?: string,
  updatedAt?: string,
  userId?:string,
  title?:string
}

export class Blog implements IBlog {
  constructor(

    public id?: string,
    public email?: string,
    public author?: string,
    public content?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public userId?: string,
    public title?: string,
  ) { }
}
