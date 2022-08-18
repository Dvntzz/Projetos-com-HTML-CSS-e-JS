const aplicarDesconto = require("./index");

test("Desconto valido?", () => {
  expect(aplicarDesconto(10, 2) === 8);
});
