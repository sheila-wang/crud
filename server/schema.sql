-- one time copy paste into elephantsql

DROP TABLE IF EXISTS people;

CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

INSERT INTO people VALUES
  (1, 'sheila', 'wang'),
  (2, 'jeremy', 'rempel');

-- query
SELECT *
FROM people;