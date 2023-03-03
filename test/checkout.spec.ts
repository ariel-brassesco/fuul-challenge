import { CheckoutService } from "../src/services";
import { initDisposableDatabase } from "./helper";

let disposeDatabase;

describe("Checkout Service Tests", () => {
  beforeAll(async () => {
    disposeDatabase = await initDisposableDatabase();
  });

  afterAll(async () => {
    await disposeDatabase();
  });

  test("Case 1 - Buy items without discount", async () => {
    const checkout = new CheckoutService();
    await checkout.scan("APE");
    await checkout.scan("PUNK");
    await checkout.scan("MEEBIT");

    const total = await checkout.getTotal();

    expect(total).toBe("139");
  });

  test("Case 2 - Buy APE items with 2x1 discount", async () => {
    const checkout = new CheckoutService();

    await checkout.scan("APE");
    await checkout.scan("PUNK");
    await checkout.scan("NOTFOUND");
    await checkout.scan("APE");

    const total = await checkout.getTotal();

    expect(total).toBe("135");
  });

  test("Case 3 - Buy PUNK items with bulk discount", async () => {
    const checkout = new CheckoutService();

    await checkout.scan("PUNK");
    await checkout.scan("PUNK");
    await checkout.scan("PUNK");
    await checkout.scan("APE");
    await checkout.scan("PUNK");

    const total = await checkout.getTotal();

    expect(total).toBe("275");
  });

  test("Case 4 - Buy items with 2x1 and bulk discount", async () => {
    const checkout = new CheckoutService();

    await checkout.scan("APE");
    await checkout.scan("PUNK");
    await checkout.scan("APE");
    await checkout.scan("APE");
    await checkout.scan("MEEBIT");
    await checkout.scan("PUNK");
    await checkout.scan("PUNK");

    const total = await checkout.getTotal();

    expect(total).toBe("304");
  });
});
