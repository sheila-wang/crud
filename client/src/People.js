import React, { useEffect, useState } from 'react';

// parent function component with hooks
function People() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [arrayOfComponents, setArrayOfComponents] = useState([]);

  // GET people
  useEffect(() => {
    fetch('http://localhost:3000/people')
      .then((response) => response.json())
      .then(
        (response) => setArrayOfComponents(response),
        (error) => {
          console.log(error);
        }
      );
  }, []);

  function deletePerson(id) {
    fetch('http://localhost:3000/people/' + id, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(
        ([response]) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // POST person
  function postPerson(event) {
    console.log('postPerson', event);
    // preventDefault prevents posting same data twice
    event.preventDefault();

    console.log('postPerson', { first_name: firstName, last_name: lastName });

    fetch('http://localhost:3000/people', {
      method: 'POST',
      /* this json header is required */
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName })
    })
      .then((response) => response.json())
      .then(
        ([response]) => {
          setArrayOfComponents([...arrayOfComponents, response]);
          setFirstName('');
          setLastName('');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div>
      {/* POST person */}
      <div>
        <form>
          POST person
          <br></br>
          first name
          <input
            name="firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          last name
          <input
            name="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
          <button onClick={postPerson}>submit</button>
        </form>
        <br></br>
        <br></br>
        GET people
      </div>

      {/* GET people */}
      <div>
        {arrayOfComponents.map((myObject, index) => (
          <div index={myObject.id}>
            <span>{myObject.id} </span>
            <span>{myObject.first_name} </span>
            <span>{myObject.last_name} </span>
            <button onClick={() => deletePerson(myObject.id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default People;
