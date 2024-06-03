import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  static id: number = 0;
  products: Product[];

  constructor() {
    this.products = [];
  }

  create(createProductDto: CreateProductDto) {
    const product = new Product();
    product.id = ++ProductsService.id;
    product.title = createProductDto.title;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.thumbnail = createProductDto.thumbnail;
    product.stock = createProductDto.stock;
    product.category = createProductDto.category;
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1)
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    return this.products[index];
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);
    product.title = updateProductDto.title;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.thumbnail = updateProductDto.thumbnail;
    product.stock = updateProductDto.stock;
    product.category = updateProductDto.category;
    return product;
  }

  remove(id: number) {
    this.findOne(id);
    const index = this.products.findIndex((product) => product.id === id);
    return this.products.splice(index, 1);
  }
}
