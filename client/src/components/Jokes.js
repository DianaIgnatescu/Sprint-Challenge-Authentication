import React from 'react';
import { Redirect } from 'react-router-dom';

const Jokes = (props) => {
  const { jokes, getJokes, signedIn } = props;

  if (!jokes.length && signedIn) {
    getJokes();
  } else if (!signedIn) {
    return <Redirect to="/sign-in" />;
  }
  return (
    <div>
      <h2>List of Jokes</h2>
      <ul>
        {jokes.map(joke => (
          <li key={joke.id}>
            <p>{joke.joke}</p>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Jokes;
