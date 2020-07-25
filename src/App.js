import React, { useReducer, useEffect } from "react";
import styles from "./styles.module.scss";
import DisplayPersons from "./DisplayPersons";
import { Button, Grid, Box, Typography } from "@material-ui/core";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
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
      return { ...state, count: state.count + 1, fibCount: 0 };
    case "decrement":
      return { ...state, count: state.count - 1, fibCount: 0 };
    case "unequal":
      return {
        ...state,
        count: state.count + (state.count % 2 ? 2 : 1),
        fibCount: 0
      };
    case "prime":
      return { ...state, count: prime(state.count - 1), fibCount: 0 };
    case "fibonacci":
      return {
        ...state,
        count: state.count + 1,
        fibCount: fibonacci(state.count)
      };
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
  if (n <= 1) return 0;
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

  const camelCase = str => {
    return str
      .split(" ")
      .map((s, index) =>
        index !== 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s.toLowerCase()
      )
      .join("");
  };

  return (
    <div className={styles.App}>
      <h1>PwC coding exercise</h1>
      <Grid
        container
        justify="center"
        spacing={3}
        className={styles.gridSpacing}
      >
        <Grid item xs={10} md={8}>
          <Grid container alignItems="center" justify="center" spacing={2}>
            <Box clone order={{ xs: 2, sm: 1 }}>
              <Grid item xs={6} sm={4}>
                <Button onClick={() => dispatch({ type: "decrement" })}>
                  <RemoveCircleOutline
                    color="primary"
                    className={styles.countIconBtn}
                  />
                </Button>
              </Grid>
            </Box>
            <Box clone order={{ xs: 1, sm: 2 }}>
              <Grid item xs={8} sm={4}>
                <p className={styles.count}>{state.count}</p>
                {state.fibCount !== 0 ? (
                  <p>Fibonacci {state.fibCount}</p>
                ) : null}
              </Grid>
            </Box>
            <Box clone order={{ xs: 3 }}>
              <Grid item xs={6} sm={4}>
                <Button onClick={() => dispatch({ type: "increment" })}>
                  <AddCircleOutline
                    color="primary"
                    className={styles.countIconBtn}
                  />
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={10} md={8}>
          <Grid container alignItems="center" justify="center" spacing={2}>
            <Grid item sm={4}>
              <Button
                fullWidth
                className={styles.btn}
                classes={{ label: styles.flexDirection }}
                onClick={() => dispatch({ type: "unequal" })}
              >
                <AddCircleOutline color="primary" />
                <Typography>Unequal</Typography>
              </Button>
            </Grid>
            <Grid item sm={4}>
              <Button
                fullWidth
                className={styles.btn}
                classes={{ label: styles.flexDirection }}
                onClick={() => dispatch({ type: "prime" })}
              >
                <RemoveCircleOutline color="primary" />
                <Typography>Prime</Typography>
              </Button>
            </Grid>
            <Grid item sm={4}>
              <Button
                fullWidth
                className={styles.btn}
                classes={{ label: styles.flexDirection }}
                onClick={() => dispatch({ type: "fibonacci" })}
              >
                <AddCircleOutline color="primary" />
                <Typography>Fibonacci</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DisplayPersons persons={data} />
    </div>
  );
}
