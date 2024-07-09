import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateProductComponent } from './components/create-update-product/create-update-product.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'brand',
    'description',
    'manufactured',
    'quantity',
    'discount',
    'price',
    'actions',
  ];

  title: string = "amadeus-test-app";
 
  productDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  openDialogCreateUpdate() {
    const dialogRef = this.dialog.open(CreateUpdateProductComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      },
    });
  }

  openUpdateForm(data: any) {
    const dialogRef = this.dialog.open(CreateUpdateProductComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      }
    });
  }

  getProductList() {
    this.productService.getProductsList().subscribe({
      next: (res) => {
        this.productDataSource = new MatTableDataSource(res);
        this.productDataSource.sort = this.sort;
        this.productDataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productDataSource.filter = filterValue.trim().toLowerCase();
    if (this.productDataSource.paginator) {
      this.productDataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number) {
    let confirm = window.confirm("Delete product?");
    if(confirm) {
      this.productService.deleteProduct(id).subscribe({
        next: (res) => {
          alert('Product successfully deleted');
          this.getProductList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  
}