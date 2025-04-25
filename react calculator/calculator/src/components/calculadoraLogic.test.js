import { createCalculatorLogic } from './calculadoraLogic';

describe('Calculadora', () => {
  let calculadora;

  beforeEach(() => {
    calculadora = createCalculatorLogic();
  });

  test('debería iniciar con display "0"', () => {
    expect(calculadora.getState().display).toBe("0");
  });

  test('debería aceptar dígitos y mostrarlos en display', () => {
    calculadora.inputDigit("5");
    expect(calculadora.getState().display).toBe("5");

    calculadora.inputDigit("3");
    expect(calculadora.getState().display).toBe("53");
  });

  test('debería manejar decimales', () => {
    calculadora.inputDigit("2");
    calculadora.inputDecimal();
    calculadora.inputDigit("5");
    expect(calculadora.getState().display).toBe("2.5");
  });

  test('debería limpiar correctamente', () => {
    calculadora.inputDigit("9");
    calculadora.clear();
    expect(calculadora.getState().display).toBe("0");
    expect(calculadora.getState().expression).toBe("");
  });

  test('debería cambiar el signo', () => {
    calculadora.inputDigit("4");
    calculadora.toggleSign();
    expect(calculadora.getState().display).toBe("-4");

    calculadora.toggleSign();
    expect(calculadora.getState().display).toBe("4");
  });

  test('debería sumar dos números', () => {
    calculadora.inputDigit("7");
    calculadora.inputOperator("+");
    calculadora.inputDigit("3");
    calculadora.calculateResult();
    expect(calculadora.getState().display).toBe("10");
  });

  test('debería restar dos números', () => {
    calculadora.inputDigit("9");
    calculadora.inputOperator("-");
    calculadora.inputDigit("4");
    calculadora.calculateResult();
    expect(calculadora.getState().display).toBe("5");
  });

  test('debería multiplicar dos números', () => {
    calculadora.inputDigit("6");
    calculadora.inputOperator("*");
    calculadora.inputDigit("3");
    calculadora.calculateResult();
    expect(calculadora.getState().display).toBe("18");
  });

  test('debería dividir dos números', () => {
    calculadora.inputDigit("8");
    calculadora.inputOperator("/");
    calculadora.inputDigit("2");
    calculadora.calculateResult();
    expect(calculadora.getState().display).toBe("4");
  });

  test('debería calcular porcentaje', () => {
    calculadora.inputDigit("200");
    calculadora.inputOperator("%");
    calculadora.inputDigit("10");
    calculadora.calculateResult();
    expect(calculadora.getState().display).toBe("20");
  });
});
