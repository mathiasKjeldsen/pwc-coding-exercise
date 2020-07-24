import React, { useReducer, useEffect } from "react";
import "./styles.css";
import DisplayPersons from "./DisplayPersons";

const data = [
  {
    name: "Jens",
    age: 24,
    hobbies: ["fishing", "sport", "television"]
  },
  {
    name: "Hans",
    age: 24,
    hobbies: ["MMA", "basketball", "Shopping"]
  },
  {
    name: "Erik",
    age: 24,
    hobbies: ["Muay Thai", "c#", "Netflix"]
  },
  {
    name: "Kim",
    age: 24,
    hobbies: ["fishing"]
  },
  {
    name: "Kasper",
    age: 24,
    work: "Engineer"
  },
  {
    name: "Nikolaj",
    age: 24,
    hobbies: ["programming", "react", "angular"]
  },
  {
    name: "Stine",
    age: 24,
    hobbies: ["running", "shopping"]
  },
  {
    name: "Hanne",
    age: 24,
    hobbies: ["boxing", "shopping"]
  }
];

/*

//1 create a function that corrects all hobbies
 into the same naming convention This can be any naming convention of your chose
 camelCase, snake_casing or PascalCasing
 This should be placed into a lifecycle hook, so the data is filtered, 
 when the component mounts/loads


//2 create a function/component, that displays only persons, with unqieu hobbies
  

//3 extend on the functionality insisde the source code
  use the useReducer hook, to create the following functionalities. 
  - increase the counter to the nearest unequal number
  - decreae  the counter to the nearest prime number
  - increase the counter using the fibonacci number sequence


//4 create some styling for the components/projects you have made so far
 you can use external libraries like styled-components, material-ui or similar
*/

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "unequal":
      return { count: state.count + (state.count % 2 ? 2 : 1) };
    case "prime":
      return { count: prime(state.count - 1) };
    case "fibonacci":
      return { count: state.count + 1, fibCount: fibonacci(state.count) };
    default:
      throw new Error("No valid selection was used");
  }
};

// Fibonacci sequence recursion
const fibonacci = n => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  else return fibonacci(n - 1) + fibonacci(n - 2);
};

// prime number recursion
const prime = n => {
  if (n <= 0) return 0;
  let p = true;
  for (let i = 2; i < n; i++)
    if (n % i === 0) {
      p = false;
    }
  if (p) return n;
  else return prime(n - 1);
};

const initialState = { fibCount: 0, count: 0 };
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    data.forEach((person, i) => {
      if (person.hobbies) {
        person.hobbies.forEach((hobby, hobbyIndex) => {
          data[i].hobbies[hobbyIndex] = camelCase(hobby);
        });
      }
    });
  }, []);

  function camelCase(str) {
    return str
      .split(" ")
      .map((s, index) =>
        index !== 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s.toLowerCase()
      )
      .join("");
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <p>count {state.count}</p>
      {state.fibCount !== undefined ? <p>Fibonacci {state.fibCount}</p> : null}
      <button onClick={() => dispatch({ type: "increment" })}>
        Increment{" "}
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrement{" "}
      </button>
      <button onClick={() => dispatch({ type: "unequal" })}>Unequal </button>
      <button onClick={() => dispatch({ type: "prime" })}>Prime </button>
      <button onClick={() => dispatch({ type: "fibonacci" })}>
        Fibonacci{" "}
      </button>

      <DisplayPersons persons={data} />
    </div>
  );
}
