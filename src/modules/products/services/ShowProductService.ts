import { getCustomRepository } from "typeorm"

import ProductRepository from "../typeorm/repositories/ProductsRepository"

import Product from "../typeorm/entities/Product"
import AppErro from "@shared/erros/AppError"

interface IResquest {
  id:string
}

class ShowProductService {
  async execute({id}:IResquest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository)

    const products = await productsRepository.findOne(id)

    if (!products) {
      throw new AppErro('Product not found XD')
    }

    return products
  }
}

export default ShowProductService