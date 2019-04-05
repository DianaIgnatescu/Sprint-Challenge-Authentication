import React from 'react';
import { Redirect } from 'react-router-dom';

const SignUp = (props) => {
  const { handleSignUpChange, handleSignUp, signUp, signedIn } = props;

  if (signedIn) {
    return <Redirect to="/jokes" />;
  }
  return (
    <div>
      <form>
        <h2>Sign Up</h2>
        <input
          placeholder="Username..."
          id="username"
          name="username"
          onChange={handleSignUpChange}
        />
        <input
          placeholder="Password..."
          id="password"
          name="password"
          onChange={handleSignUpChange}
          type="password"
        />
        <button type="submit" onClick={(event) => handleSignUp(event, signUp)}>SIGN UP</button>
      </form>
    </div>
  )
};

export default SignUp;
