import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductsController {
  async index(resquest: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return response.json(products);
  }

  async show(resquest: Request, response: Response): Promise<Response> {
    const { id } = resquest.params;

    const showProducts = new ShowProductService();

    const product = await showProducts.execute({ id });

    return response.json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });
    return response.json(product);
  }

  async delete(request: Request, response: Response): Promise<Response>{
    const { id } = request.params

    const deleteProduct = new DeleteProductService()

    await deleteProduct.execute({id})

    return response.json([])

  }

}
