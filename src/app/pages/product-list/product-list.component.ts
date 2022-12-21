import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { IProduct, IProductWrapper } from 'src/app/interfaces/i-product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
products:Array<any>=[];
product:IProduct = {}as IProduct;
showMore:boolean=false;

constructor(private productService:ProductService){}
ngOnInit(): void {
  this.onAll();
}

onAll():void{
  this.productService.all().subscribe((response:IProductWrapper) =>{
    this.products=response.products;});
}

showToggle(){
  this.showMore=!this.showMore;
}

showDetail(p:IProduct){
  this.product=p;
  // this.isDetailShow=!this.isDetailShow
}
}
