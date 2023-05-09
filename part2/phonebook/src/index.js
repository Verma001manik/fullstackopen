import ReactDOM from "react-dom/client"
import { useState } from "react"
import App from "./App"
const phonenumbers = [
  {
    id:1,
    name: 'Arto Hellas',
    number: 93949323,
  },
  {
    id:2,
    name: 'Odin',
    number: 23222223,
  },
  {
    id:3,
    name: 'Ragnar lothbrok',
    number: 564565,
  }
]
ReactDOM.createRoot(document.getElementById("root")).render(
  <App persons={phonenumbers} />
)
