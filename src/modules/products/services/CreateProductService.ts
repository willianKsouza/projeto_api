import { getCustomRepository } from "typeorm"

import ProductRepository from "../typeorm/repositories/ProductsRepository"
import AppErro from "@shared/erros/AppError"
import Product from "../typeorm/entities/Product"


interface IResquest {
  name: string
  price: number
  quantity: number
}

class CreateProductService {
  async execute({name, price, quantity}: IResquest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository)
    const productExists = await productsRepository.findByName(name)

    if (productExists) {
      throw new AppErro('there is already one product with this name XD')
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    })

    await productsRepository.save(product)

    return product
  }
}

export default CreateProductService