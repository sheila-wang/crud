import React, { useEffect, useState } from 'react';

function People() {
  const [people, setPeople] = useState([]);

  // GET getAllPeople
  useEffect(() => {
    fetch('http://localhost:3000/people')
      .then((response) => response.json())
      .then(
        (response) => {
          setPeople(response);
        },

        (error) => {
          console.log(error);
        }
      );
  }, []);

  const arrayOfComponents = [];

  for (let index = 0; index < people.length; index++) {
    console.log('arrayOfComponents', arrayOfComponents);

    arrayOfComponents.push(
      <Record
        key={index}
        id={people[index]['id']}
        first_name={people[index]['first_name']}
        last_name={people[index]['last_name']}
      />
    );
  }

  return <div>{arrayOfComponents}</div>;
}

function Record(props) {
  return (
    <div>
      <div>{props.id}</div>
      <div>{props.first_name}</div>
      <div>{props.last_name}</div>
    </div>
  );
}

export default People;