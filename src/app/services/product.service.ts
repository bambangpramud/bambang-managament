import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductWrapper } from '../interfaces/i-product';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoint:string="/products"
  endpointCreate:string="/products/add"

  constructor(private baseService:BaseService,
    private httpClient:HttpClient
    ) { }

    all():Observable<IProductWrapper>{
      return this.httpClient.get<IProductWrapper>(
        `${this.baseService.baseURL}${this.endpoint}`
      )
    }

    create(product:IProduct):Observable<IProduct>{
      const headers={
        'Content-Type':'application/json'
      };
      const body = JSON.stringify(product);

      return this.httpClient.post<IProduct>(

        `${this.baseService.baseURL}${this.endpointCreate}`,body,{headers}
      );
      
    }

    update(product:IProduct):Observable<IProduct>{
      const headers={
        'Content-Type':'application/json'
      };
      const {id, ...productClean}= product;
      const body = JSON.stringify(productClean);

      return this.httpClient.put<IProduct>(

        `${this.baseService.baseURL}${this.endpoint}/${id}`,body,{headers}
      );
    }
    delete(id:number):Observable<IProduct>{
    

      return this.httpClient.delete<IProduct>(

        `${this.baseService.baseURL}${this.endpoint}/${id}`
      );
    }

    
}
