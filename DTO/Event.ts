export default class Event{
    
    private id : number | null
    private description : string | null
    private type : string | null
    private adminId : number | null
    private userId : number | null
    private start : Date | null
    private end : Date | null

    constructor(id : number | null, description : string | null, type : string | null, adminId : number | null, userId : number | null, start : Date | null, end : Date | null){
        this.id = id
        this.description = description
        this.type = type
        this.adminId = adminId
        this.userId = userId
        this.start = start
        this.end = end
    }

    public getId(){
        return this.id
    }

    public getDescription(){
        return this.description
    }

    public getType(){
        return this.type
    }

    public getAdminId(){
        return this.adminId
    }

    public getUserId(){
        return this.userId
    }

    public getStart(){
        return this.start
    }

    public getEnd(){
        return this.end
    }

    public setId(id : number){
        this.id = id
    }

    public setDescription(description : string){
        this.description = description
    }

    public setType(type : string){
        this.type = type
    }

    public setAdminId(adminId : number){
        this.adminId = adminId
    }

    public setUserId(userId : number){
        this.userId = userId
    }

    public setStart(start : Date){
        this.start = start
    }

    public setEnd(end : Date){
        this.end = end
    }
}