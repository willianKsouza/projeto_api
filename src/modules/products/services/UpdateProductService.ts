import { getCustomRepository } from 'typeorm';

import ProductRepository from '../typeorm/repositories/ProductsRepository';

import Product from '../typeorm/entities/Product';
import AppErro from '@shared/erros/AppError';

interface IResquest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity,
  }: IResquest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppErro('Product not found XD');
    }
    const productExists = await productsRepository.findByName(name);

    if (productExists && name === product.name) {
      throw new AppErro('there is already one product with this name XD');
    }
    product.name = name
    product.price = price
    product.quantity = quantity

    await productsRepository.save(product)


    return product;
  }
}

export default UpdateProductService;
