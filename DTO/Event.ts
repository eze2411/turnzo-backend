export default class Event{
    
    private id : number | null
    private description : string | null
    private type : string | null
    private origin : string | null
    private destiny : string | null
    private start : Date | null
    private end : Date | null

    constructor(id : number | null, description : string | null, type : string | null, origin : string | null, destiny : string | null, start : Date | null, end : Date | null){
        this.id = id
        this.description = description
        this.type = type
        this.origin = origin
        this.destiny = destiny
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

    public getOrigin(){
        return this.origin
    }

    public getDestiny(){
        return this.destiny
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

    public setOrigin(origin : string){
        this.origin = origin
    }

    public setDestiny(destiny : string){
        this.destiny = destiny
    }

    public setStart(start : Date){
        this.start = start
    }

    public setEnd(end : Date){
        this.end = end
    }
}