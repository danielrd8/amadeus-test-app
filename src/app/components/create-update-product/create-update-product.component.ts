import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.css',
})
export class CreateUpdateProductComponent implements OnInit {
  productForm: FormGroup;

  brands: string[] = [
    'Lenovo',
    'Mac',
    'Xiaomi',
    'Dell',
    'Sony',
  ];

  today: Date;
  indetDiscount: boolean;

  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<CreateUpdateProductComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.productForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      manufacturingDate: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required]
    });

    this.today = new Date();
    this.indetDiscount = data ? false: true;
  }

  ngOnInit(): void {
    this.productForm.patchValue(this.data);

  }

  submit() {
    if (this.productForm.valid) {
      if (this.data) {
        this.productService
          .updateProduct(this.productForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Product successfully updated');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error updating product");
            },
          });
      } else {
        this.productService
        .createProduct(this.productForm.value)
        .subscribe({
          next: (val: any) => {
            alert('Product successfully created');
            this.productForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error creating product");
          },
        });
      }
    }
  }
}