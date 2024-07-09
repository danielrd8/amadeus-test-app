import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    baseUrl: string = "http://localhost:8092/";

    constructor(private httpClient: HttpClient) { }

    getProductsList(): Observable<any> {
      return this.httpClient.get(this.baseUrl + 'api/products');
    }

    createProduct(data: any): Observable<any> {
        return this.httpClient.post(this.baseUrl + 'api/products', data);
    }

    updateProduct(data: any): Observable<any> {
        return this.httpClient.put(this.baseUrl + 'api/products', data);
    }

    deleteProduct(id: number): Observable<any> {
        return this.httpClient.delete(this.baseUrl + 'api/products/'+ id);
    }
}