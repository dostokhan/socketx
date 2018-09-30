import React from 'react';


const SignUpForm = props =>
  (
    <form onSubmit={props.onSubmit}>
      <fieldset disabled={props.loading} >
        <input
          type="text"
          name="username"
          value={props.username}
          placeholder="username ?"
          onChange={props.onChange}
        />
        <input
          type="password"
          name="password"
          value={props.password}
          placeholder="password ?"
          onChange={props.onChange}
        />
        <button type="submit">Sign Up</button>
      </fieldset>
    </form>
  );

export default SignUpForm;
