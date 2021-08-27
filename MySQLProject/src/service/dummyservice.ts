import * as request from 'request';
import { Dummy } from './dummy';

export class DummyService {

    public dummyUsers : Dummy[];

    getEmpData(cb: (dummies : Dummy [])=> any) {
        request.get("https://jsonplaceholder.typicode.com/todos/", null, 
        (error: any, response : any, body: any) => {
            // this.handleResponse(body);

            let dummies :  Dummy[] = JSON.parse(body);
            console.log(dummies[1].title);
            cb(dummies);
        } );
    }

    handleResponse(response : any) {
        console.log("called the service");

        // console.log("Size of objects "+response);
        let dummies :  Dummy[] = JSON.parse(response);
        console.log(dummies[1].title);

        this.dummyUsers = dummies;
        

     }
}