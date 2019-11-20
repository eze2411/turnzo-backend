export default class User {
    private id : number | null
    private email : string | null
    private password : string | null
    private firstName : string | null 
    private lastName : string | null
    private birthdate : string | null
    private role : string | null

    public constructor(id : number | null, email : string | null, password : string | null, firstName : string | null, lastName : string | null, birthdate : string | null, role : string | null){
        this.id = id
        this.email = email
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.birthdate =  birthdate
        this.role = role
    }

    //Getters

    public getId() : number | null{
        return this.id        
    }

    public getEmail() : string | null {
        return this.email
    }

    public getPassword() : string | null {
        return this.password
    }

    public getFirstName() : string | null {
        return this.firstName
    }

    public getLastName() : string | null {
        return this.lastName
    }

    public getBirthdate() : string | null {
        return this.birthdate
    }

    public getRole() : string | null {
        return this.role
    }

    //Setters

    public setId(id : number){
        this.id = id
    }

    public setEmail(email : string){
        this.email = email
    }

    public setPassword(password : string){
        this.password = password
    }

    public setFirstName(firstName : string){
        this.firstName = firstName
    }

    public setLastName(lastName : string){
        this.lastName = lastName
    }

    public setBirthdate(birthdate : string){
        this.birthdate = birthdate
    }

    public setRole(role : string){
        this.role = role
    }
}