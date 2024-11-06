import { Component } from '@angular/core';
import { TestService } from '../../services/test.service';
import { StorageHelper } from '../../../common/service/storage.helper';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  test:string="this";
  constructor(private testservice: TestService,private storage:StorageHelper) {
   }

   onNoClick() {
    this.test=this.testservice.get(this.test);
    this.storage.add('test',this.test);
    alert(this.test);
    }
    logout(): void{
      
    }

    featuredProducts =[
      { name:'stylish jacket',price:'999', image:'/assets/images/jacket.jpeg'},
      {name:'stylish tshirt',price:'899', image:'/assets/images/tshirt.jpeg'},
      {name:'stylish tshirt',price:'899', image:'/assets/images/tshirt.jpeg'},
      {name:'stylish tshirt',price:'899', image:'/assets/images/tshirt.jpeg'},
      {name:'stylish tshirt',price:'899', image:'/assets/images/tshirt.jpeg'},
      {name:'stylish tshirt',price:'899', image:'/assets/images/tshirt.jpeg'},
      {name:'stylish tshirt',price:'899', image:'/assets/images/tshirt.jpeg'},
      {name:'stylish tshirt',price:'899', image:'/assets/images/tshirt.jpeg'},
    ];

    addToCart(product:any){
      console.log('{$product.name} added to cart' )

    }
    viewProductDetails(product:any){
      console.log('product clicked', product);
    }

}
