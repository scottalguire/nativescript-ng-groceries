import { Injectable } from '@angular/core';
import { MockUser } from './mock-user';
import { MOCKUSERS } from './mock-users';

@Injectable()
export class MockUserService {

    getUsers(): Promise<MockUser[]> {
        return Promise.resolve(MOCKUSERS);
    }

    getUser(id: number): Promise<MockUser> {
        return this.getUsers()
            .then(users => users.find(user => user.id === id));
    }
}