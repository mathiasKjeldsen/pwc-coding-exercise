import React from "react";

export default class DisplayPersons extends React.Component {
  render() {
    const { persons } = this.props;
    return (
      <div>
        {persons.map((person, key) => (
          <div key={key} style={{ padding: "10px 0" }}>
            <p>
              {person.name}, {person.age}
            </p>
            {person.hobbies
              ? person.hobbies.map((hobby, key) => (
                  <p key={key} style={{ display: "inline" }}>
                    {hobby +
                      (person.hobbies.length === key + 1
                        ? " "
                        : person.hobbies.length === key + 2
                        ? " and "
                        : ", ")}
                  </p>
                ))
              : "No hobbies"}
          </div>
        ))}
      </div>
    );
  }
}
