export class User {

    public id: string;

    public name: string;

    public img: string;

    public room: string;

    constructor(

        id: string,

        name: string = 'sin-nombre',

        img: string = 'sin-imagen',

        room: string = 'sin-sala',

    ) {

        this.id = id;

        this.name = name;

        this.img = img;

        this.room = room;

    }

}