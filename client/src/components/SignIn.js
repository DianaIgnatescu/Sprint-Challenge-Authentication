import React from 'react';

const SignIn = (props) => {
  const { handleSignInChange, handleSignIn, signIn } = props;
  return (
    <div>
      <form>
        <h2>Sign In</h2>
        <input
          placeholder="Username..."
          id="username"
          name="username"
          onChange={handleSignInChange}
        />
        <input
            placeholder="Password..."
            id="password"
            name="password"
            onChange={handleSignInChange}
            type="password"
        />
        <button type="submit" onClick={(event) => handleSignIn(event, signIn)}>SIGN IN</button>
      </form>
    </div>
  )
};

export default SignIn;
