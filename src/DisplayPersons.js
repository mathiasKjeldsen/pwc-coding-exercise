import React from "react";

export default class DisplayPersons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { persons: [] };
  }

  componentDidMount = () => {
    this.filterPersons(this.props.persons);
  };

  filterPersons = persons => {
    let _hobbies = [];
    // Save all hobbies in an array
    persons.forEach(person => {
      if (person.hobbies) {
        person.hobbies.forEach(h => _hobbies.push(h));
      }
    });
    function getHobbLen(array, value) {
      return array.filter(v => v === value).length;
    }
    // find hobbies that occur more than once
    const multipleOccurences = _hobbies.filter(hobby => {
      return getHobbLen(_hobbies, hobby) > 1;
    });
    // filter the persons array to only show persons with unique hobbies
    const _persons = persons.filter(p => {
      if (p.hobbies === undefined) return false;
      let isUnique = true;
      p.hobbies.forEach(val => {
        if (multipleOccurences.includes(val.toLowerCase())) isUnique = false;
      });
      return isUnique;
    });
    // setState to display
    this.setState({ persons: _persons });
  };

  render() {
    const { persons } = this.state;
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
