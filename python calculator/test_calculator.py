import unittest
from calculator import add, subtract, multiply, divide

class TestCalculadora(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(-1, -1), -2)
        self.assertEqual(add(67, 0), 67)
        self.assertEqual(add(-67, 0), -67)
        self.assertEqual(add(0, 0), 0)
        self.assertAlmostEqual(add(0.2, 1), 1.2)
        self.assertAlmostEqual(add(0.2, 1.5), 1.7)
        self.assertAlmostEqual(add(0.2, -0.5), -0.3)
        self.assertAlmostEqual(add(-0.2, -0.5), -0.7)
        self.assertAlmostEqual(add(0.2, 0), 0.2)
    
    def test_subtract(self):
        self.assertEqual(subtract(2, 3), -1)
        self.assertEqual(subtract(-1, 1), -2)
        self.assertEqual(subtract(-1, -1), 0)
        self.assertEqual(subtract(67, 0), 67)
        self.assertEqual(subtract(-67, 0), -67)
        self.assertEqual(subtract(0, 0), 0)
        self.assertAlmostEqual(subtract(0.2, 1), -0.8)
        self.assertAlmostEqual(subtract(0.2, 1.5), -1.3)
        self.assertAlmostEqual(subtract(0.2, -0.5), 0.7)
        self.assertAlmostEqual(subtract(-0.2, -0.5), 0.3)
        self.assertAlmostEqual(subtract(0.2, 0), 0.2)

    def test_multiply(self):
        self.assertEqual(multiply(2, 3), 6)
        self.assertEqual(multiply(-1, 1), -1)
        self.assertEqual(multiply(-1, -1), 1)
        self.assertEqual(multiply(67, 0), 0)
        self.assertEqual(multiply(-67, 0), 0)
        self.assertEqual(multiply(0, 0), 0)
        self.assertAlmostEqual(multiply(0.2, 1), 0.2)
        self.assertAlmostEqual(multiply(0.2, 1.5), 0.3)
        self.assertAlmostEqual(multiply(0.2, -0.5), -0.1)
        self.assertAlmostEqual(multiply(-0.2, -0.5), 0.1)
        self.assertAlmostEqual(multiply(0.2, 0), 0.0)

    def test_divide(self):
        self.assertEqual(divide(6, 3), 2)
        self.assertEqual(divide(-1, 1), -1)
        self.assertEqual(divide(-1, -1), 1)
        self.assertEqual(divide(67, 1), 67)
        self.assertEqual(divide(-67, 1), -67)
        self.assertEqual(divide(0, 67), 0)
        self.assertAlmostEqual(divide(0.2, 1), 0.2)
        self.assertAlmostEqual(divide(0.3, 1.5), 0.2)
        self.assertAlmostEqual(divide(0.2, -0.5), -0.4)
        self.assertAlmostEqual(divide(-0.2, -0.5), 0.4)
        self.assertAlmostEqual(divide(0.2, 1), 0.2)

    def test_divide_by_zero(self):
        self.assertEqual(divide(10, 0), "No es posible dividir por cero")
        self.assertEqual(divide(-10, 0), "No es posible dividir por cero")
        self.assertEqual(divide(0, 0), "No es posible dividir por cero")
        self.assertAlmostEqual(divide(0.2, 0), "No es posible dividir por cero")
        self.assertAlmostEqual(divide(-0.2, 0), "No es posible dividir por cero")

if __name__ == '__main__':
    unittest.main()
