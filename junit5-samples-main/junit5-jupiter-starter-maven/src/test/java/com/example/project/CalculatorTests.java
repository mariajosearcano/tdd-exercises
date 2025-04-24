/*
 * Copyright 2015-2025 the original author or authors.
 *
 * All rights reserved. This program and the accompanying materials are
 * made available under the terms of the Eclipse Public License v2.0 which
 * accompanies this distribution and is available at
 *
 * https://www.eclipse.org/legal/epl-v20.html
 */

package com.example.project;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class CalculatorTests {

	Calculator calculator = new Calculator();

	@Test
	@DisplayName("1 + 1 = 2")
	void addsTwoNumbers() {
		assertEquals(2, calculator.add(1, 1), "1 + 1 should equal 2");
	}

	@ParameterizedTest(name = "{0} + {1} = {2}")
	@CsvSource({
			"0, 1, 1",
			"1, 2, 3",
			"49, 51, 100",
			"1, 100, 101"
	})
	void add(int first, int second, int expectedResult) {
		assertEquals(expectedResult, calculator.add(first, second),
				() -> first + " + " + second + " should equal " + expectedResult);
	}

	@ParameterizedTest(name = "{0} - {1} = {2}")
	@CsvSource({
			"5, 3, 2",
			"10, 10, 0",
			"100, 50, 50"
	})
	void subtract(int first, int second, int expectedResult) {
		assertEquals(expectedResult, calculator.subtract(first, second),
				() -> first + " - " + second + " should equal " + expectedResult);
	}

	@ParameterizedTest(name = "{0} * {1} = {2}")
	@CsvSource({
			"2, 3, 6",
			"5, 5, 25",
			"7, 0, 0"
	})
	void multiply(int first, int second, int expectedResult) {
		assertEquals(expectedResult, calculator.multiply(first, second),
				() -> first + " * " + second + " should equal " + expectedResult);
	}

	@ParameterizedTest(name = "{0} / {1} = {2}")
	@CsvSource({
			"10, 2, 5",
			"100, 10, 10",
			"9, 3, 3"
	})
	void divide(int first, int second, int expectedResult) {
		assertEquals(expectedResult, calculator.divide(first, second),
				() -> first + " / " + second + " should equal " + expectedResult);
	}

	@Test
	@DisplayName("Division by zero throws ArithmeticException")
	void divideByZeroThrowsException() {
		assertThrows(ArithmeticException.class, () -> calculator.divide(10, 0),
				"Division by zero should throw ArithmeticException");
	}
}
