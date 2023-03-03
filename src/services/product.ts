import { Product } from "../model";

/*
  A services to manage product table data.
  In the future, you could add the necessary methods for
  update, delete, etc.
*/
class ProductService {
  public async findByCode(code: string) {
    return Product.query().where("code", code).first();
  }

  public async findByCodes(codes: string[]) {
    return Product.query().whereIn("code", codes);
  }
}

export const productService = new ProductService();
