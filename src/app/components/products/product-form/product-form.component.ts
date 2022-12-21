import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { ProductService } from 'src/app/services/product.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  isConfirmDelete:boolean=false;
  showMore:boolean=false;
  showToast:boolean=false;
  @Input() product:IProduct ={}as IProduct;


constructor(private productService:ProductService,
  private toasterService:ToasterService
  ){

}

  showToggle(){
    this.showMore=!this.showMore
  }

  save(){
    this.showMore=false;
    this.product = {}as IProduct;
    this.isConfirmDelete=false;
  }

  setProduct(product:IProduct){
    this.product=JSON.parse(JSON.stringify(product));
  }

onCreate(){
this.productService.create(this.product)
.subscribe((response:IProduct)=>{
  this.showMore=false;
  this.product={} as IProduct;
  this.toasterService.showToast=true;
  this.toasterService.message=`berhasil menyimpan data ${response.title}`
});
}
onUpdate(){
this.productService.update(this.product)
.subscribe((response:IProduct)=>{
  this.showMore=false;
  this.product={} as IProduct;
  this.toasterService.showToast=true;
  this.toasterService.message=`berhasil mengupdate data ${response.title}`
});
}
onDelete(){
this.productService.delete(this.product.id)
.subscribe((response:IProduct)=>{
  this.showMore=false;
  this.product={} as IProduct;
  this.toasterService.showToast=true;
  this.toasterService.message=`berhasil menghapus data ${response.title}`
  this.isConfirmDelete=false;
});
}

}
