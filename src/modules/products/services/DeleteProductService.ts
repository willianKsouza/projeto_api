import { getCustomRepository } from "typeorm"

import ProductRepository from "../typeorm/repositories/ProductsRepository"

import AppErro from "@shared/erros/AppError"

interface IResquest {
  id:string
}

class DeleteProductService {
  async execute({id}:IResquest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppErro('Product not found XD')
    }
    await productsRepository.remove(product)

  }
}

export default DeleteProductService