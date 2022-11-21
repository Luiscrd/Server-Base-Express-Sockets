import { User } from './user';

export class ListUsers {

    private list: User[] = [];

    constructor() { }

    public add(user: User) {

        this.list.push(user);

        console.log(this.list);

        return user;

    }

    public updateName(id: string, name: string) {

        this.list.forEach((user: User) => {

            if (user.id === id) {

                user.name = name;

            }

        })

        console.log('Actualizando Usuario');

        console.log(this.list);

    }

    public getList() {

        return this.list;

    }

    public getUser(id: string) {

        this.list.find((user: User) => user.id === id);

    }

    public getUsersRoom(room: string) {

        this.list.filter((user: User) => user.room === room);

    }

    public deleteUser(id: string) {

        const userTemp = this.getUser(id);

        this.list = this.list.filter((user: User) => user.id !== user.id);
    }

}