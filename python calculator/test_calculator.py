import unittest
from calculator import add, subtract, multiply, divide

class TestCalculadora(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(0, 0), 0)
        self.assertEqual(add(-0.2, -0.5), -0.7)
        self.assertEqual(add(0.2, 1), 1.2)
        self.assertEqual(add(0.2, -0.5), -0.3)
    
    def test_subtract(self):
        self.assertEqual(subtract(5, 3), 2)
        self.assertEqual(subtract(10, 0), 10)
        self.assertEqual(subtract(-1, -1), 0)
        self.assertEqual(subtract(0.9, 0.2), 0.7)
        self.assertEqual(subtract(0.9, -2), 2.9)
        self.assertEqual(subtract(-0.9, 1), -1.9)
    
    def test_multiply(self):
        self.assertEqual(multiply(3, 4), 12)
        self.assertEqual(multiply(0, 5), 0)
        self.assertEqual(multiply(-2, 3), -6)
        self.assertEqual(multiply(0.5, -5), -2.5)
        self.assertEqual(multiply(0.5, 3), 1.5)
        self.assertEqual(multiply(-0.3, -5), 1.5)
    
    def test_divide(self):
        self.assertEqual(divide(10, 2), 5)
        self.assertEqual(divide(0.9, 3), 0.3)
        self.assertEqual(divide(-5, 2), -2.5)
        self.assertEqual(divide(-0.5, 2), -0.25)
        self.assertEqual(divide(-0.5, -2), 0.25)
    
    def test_divide_by_zero(self):
        self.assertEqual(divide(10, 0), "No es posible dividir por cero")

if __name__ == '__main__':
    unittest.main()
