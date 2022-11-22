import colors from 'colors';
import { User } from './user';

export class ListUsers {

    private list: User[] = [];

    constructor() { }

    public add(user: User) {

        this.list.push(user);

        console.log(colors.yellow(`[LisUser] ${user.id} =>`), colors.green('(add)'));

        // console.log(this.list);

        // return user;

    }

    public updateName(id: string, name: string, img: string) {

        this.list.forEach((user: User) => {

            if (user.id === id) {

                user.name = name;

                user.img = img;

            }
            
        })

        console.log(colors.yellow(`[LisUser] ${name} =>`), colors.green('(update)'));

        console.log(this.list);

    }

    public getList() {

        return this.list.filter(user => user.name !== 'sin-nombre');

    }

    public getUser(id: string) {

        this.list.find((user: User) => user.id === id);

    }

    public getUsersRoom(room: string) {

        this.list.filter((user: User) => user.room === room);

    }

    public deleteUser(id: string) {

        const userTemp = this.getUser(id);

        this.list = this.list.filter((user: User) => user.id !== id);

        console.log(colors.yellow(`[LisUser] ${id} =>`), colors.red('(deleted)'));

        return userTemp;
        
    }

}