import "reflect-metadata";
import {createConnection} from "typeorm";
import {Catalog} from "./entity/Catalog";
import { DummyService } from "./service/dummyservice";
import { User } from "./entity/User";
import { Dummy } from "./service/dummy";


 
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "mysql",
  entities: [
      __dirname + "/entity/*.ts"
  ],
  synchronize: true,
  logging: false
}).then(async connection => {
 
  let catalog = new Catalog();
  catalog.journal = "Oracle Magazine";
  catalog.publisher = "Oracle Publishing";
  catalog.edition = "March-April 2005";
  catalog.title = "Starting with Oracle ADF";
  catalog.author = "Steve Muench";
  catalog.isPublished = true;
 
  let catalogRepository = connection.getRepository(Catalog);

  await catalogRepository.save(catalog);
  console.log('Catalog has been saved'+'\n');
 
  let [all_Catalogs, CatalogsCount] = await catalogRepository.findAndCount();

  console.log('Catalogs count: ', CatalogsCount+'\n');


    let svc = new DummyService();
    let user = new User();
    svc.getEmpData((dummies : Dummy [])=> {
        console.log("$$$$$$$$ "+dummies.length);
       
        let userRepo = connection.getRepository(User);

        for(let i=0; i< 10; i++) {
          user.id = dummies[i].id;
          user.title = dummies[i].title;
          user.completed = dummies[i].completed;
          user.userId = dummies[i].userId;
        
          userRepo.save(user);
      }
    });
    
    


}).catch(error => console.log(error));