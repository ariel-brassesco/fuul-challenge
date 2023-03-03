import { Product } from "../model";

class ProductService {
  public async findByCode(code: string) {
    return Product.query().where("code", code).first();
  }

  public async findByCodes(codes: string[]) {
    return Product.query().whereIn("code", codes);
  }
}

export const productService = new ProductService();
