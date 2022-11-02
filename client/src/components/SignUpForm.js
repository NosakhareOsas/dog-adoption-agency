import React, { useState } from "react";

function SignUpForm({ onLogin }){
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            surname,
            username,
            password,
            password_confirmation: passwordConfirmation,
            bio,
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              id="firstname"
              autoComplete="off"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />

            <br />

            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              autoComplete="off"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />

            <br />
          
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <br />

            <label htmlFor="bio">Bio</label>
            <textarea
              rows="3"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <br />
          
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            
            <br />
          
            <label htmlFor="password">Password Confirmation</label>
            <input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="current-password"
            />
          
            <br />

            <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
          
            {errors.map((err) => (
              <h3 key={err}>{err}</h3>
            ))}
          
        </form>
      );
}


export default SignUpForm;