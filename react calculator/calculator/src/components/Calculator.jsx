"use client"

import { useState } from "react"
import styles from "./Calculator.module.css"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [expression, setExpression] = useState("")
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)

      const parts = expression.split(" ")
      parts[parts.length - 1] = digit
      setExpression(parts.join(" "))
    } else {
      setDisplay(display === "0" ? digit : display + digit)

      if (expression === "" || expression === "0") {
        setExpression(digit)
      } else if (operator && waitingForSecondOperand) {
        setExpression(expression + " " + digit)
      } else {
        setExpression(expression + digit)
      }
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setExpression(expression + " 0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
      setExpression(expression + ".")
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setExpression("")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const toggleSign = () => {
    if (display === "0") return

    const newValue = display.startsWith("-") ? display.slice(1) : "-" + display
    setDisplay(newValue)

    if (expression !== "") {
      const parts = expression.split(" ")
      parts[parts.length - 1] = newValue
      setExpression(parts.join(" "))
    } else {
      setExpression(newValue)
    }
  }

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display)
  

    if (waitingForSecondOperand && nextOperator === "-") {
      setDisplay("-")
      
      const parts = expression.trim().split(" ")
      const lastPart = parts[parts.length - 1]
  
      // Solo agrega el "-" si no hay ya un número en edición
      if (!lastPart || ["+", "-", "×", "÷", "%"].includes(lastPart)) {
        parts.push("-")
      } else {
        parts[parts.length - 1] = "-" + lastPart
      }
  
      setExpression(parts.join(" "))
      setWaitingForSecondOperand(false)
      return
    }
  

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator && !waitingForSecondOperand) {
      const result = performCalculation()
      setDisplay(String(result))
      setFirstOperand(result)
      setExpression(String(result))
    }
  
    const operatorSymbol =
      nextOperator === "+" ? " + " :
      nextOperator === "-" ? " - " :
      nextOperator === "*" ? " × " :
      nextOperator === "/" ? " ÷ " :
      " % "
  
 
    if (!waitingForSecondOperand) {
      setExpression(expression.trim() + operatorSymbol)
    }
  
    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }
  

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    switch (operator) {
      case "+":
        return firstOperand + inputValue
      case "-":
        return firstOperand - inputValue
      case "*":
        return firstOperand * inputValue
      case "/":
        return firstOperand / inputValue
      case "%":
        return firstOperand * (inputValue / 100)
      default:
        return inputValue
    }
  }

  const handleEquals = () => {
    if (!operator || firstOperand === null) return

    const result = performCalculation()
    setDisplay(String(result))
    setExpression(expression + " = " + result)
    setFirstOperand(result)
    setOperator(null)
    setWaitingForSecondOperand(true)
  }

  const getButtonClass = (label) => {
    if (["÷", "×", "-", "+", "="].includes(label)) {
      return styles.operatorButton
    } else if (["C", "+/-", "%"].includes(label)) {
      return styles.functionButton
    } else {
      return styles.numberButton
    }
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.header}>
        <div className={styles.expression}>{expression}</div>
        <div className={styles.display}>{display}</div>
      </div>
      <div className={styles.grid}>
        {[
          ["C", clearDisplay],
          ["+/-", toggleSign],
          ["%", () => handleOperator("%")],
          ["÷", () => handleOperator("/")],
          ["7", () => inputDigit("7")],
          ["8", () => inputDigit("8")],
          ["9", () => inputDigit("9")],
          ["×", () => handleOperator("*")],
          ["4", () => inputDigit("4")],
          ["5", () => inputDigit("5")],
          ["6", () => inputDigit("6")],
          ["-", () => handleOperator("-")],
          ["1", () => inputDigit("1")],
          ["2", () => inputDigit("2")],
          ["3", () => inputDigit("3")],
          ["+", () => handleOperator("+")],
          ["0", () => inputDigit("0"), 2],
          [".", inputDecimal],
          ["=", handleEquals],
        ].map(([label, onClick, span], index) => (
          <button
            key={index}
            className={`${styles.button} ${getButtonClass(label)} ${span ? styles.spanTwo : ""}`}
            onClick={onClick}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

