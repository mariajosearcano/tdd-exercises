import time

def add(number1, number2):
    return number1 + number2

def subtract(number1, number2):
    return number1 - number2

def multiply(number1, number2):
    return number1 * number2

def divide(number1, number2):
    if number2 == 0:
        return "No es posible dividir por cero"
    return number1 / number2

def calculadora():
    while True:
        print("\nBienvenido a la calculadora en Python")
        print("Opciones:")
        print("1. Sumar")
        print("2. Restar")
        print("3. Multiplicar")
        print("4. Dividir")
        print("5. Apagar")

        opcion = input("Elige una opción (1-5): ")

        if opcion == '5':
            print("Apagando la calculadora...")
            break

        if opcion not in ['1', '2', '3', '4']:
            print("Opción no válida.")
            time.sleep(2)
            continue

        try:
            number1 = float(input("Ingresa el primer número: "))
            number2 = float(input("Ingresa el segundo número: "))
        except ValueError:
            print("Por favor, ingresa solo números.")
            continue

        if opcion == '1':
            result = add(number1, number2)
        elif opcion == '2':
            result = subtract(number1, number2)
        elif opcion == '3':
            result = multiply(number1, number2)
        elif opcion == '4':
            result = divide(number1, number2)

        print(f"Resultado: {result}")
        time.sleep(2)

if __name__ == '__main__':
    calculadora()

