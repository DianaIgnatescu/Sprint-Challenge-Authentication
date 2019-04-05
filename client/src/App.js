import React, { Component } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Jokes from './components/Jokes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: {
        username: '',
        password: '',
      },
      signUp: {
        username: '',
        password: '',
      },
      jokes: [],
      signedIn: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ signedIn: true });
    }
  }

  getJokes() {
    const token = localStorage.getItem('token');
    const reqOptions = {
      headers: {
        authorization: token
      }
    };

    axios
      .get('http://localhost:3300/api/jokes', reqOptions)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(error => console.log(error));
  }

  handleSignInChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      signIn: {...this.state.signIn, [name]: value}
    });
  };

  handleSignIn = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3300/api/login', this.state.signIn)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        this.setState({ signedIn: true });
        this.props.history.push('/jokes');
      })
      .catch((error) => console.log(error));
  };

  handleSignUpChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      signUp: {...this.state.signUp, [name]: value }
    });
  };

  handleSignUp = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3300/api/register', this.state.signUp)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        this.props.history.push('/sign-in');
      })
      .catch((error) => console.log(error));
  };

  onSignOut = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.setState({
        signedIn: false,
      });
      this.props.history.push('/sign-in');
    } else {
      this.props.history.push('/jokes');
    }
  };

  render() {
    const { jokes, signIn, signedIn, signUp } = this.state;
    return (
      <div className="App">
        {signedIn && localStorage.getItem('token') ? (
            <nav>
              <NavLink to="/jokes">HOME</NavLink>
              <button className="sign-out" type="submit" onClick={this.onSignOut}>SIGN OUT</button>
            </nav>
        ) : (
            <nav>
              <NavLink to="/sign-in">SIGN IN</NavLink>
              <NavLink to="/sign-up">SIGN UP</NavLink>
            </nav>
        )}

        <main>
          <Route exact path="/sign-in" render={(props) =>
            <SignIn
              {...props}
              signIn={signIn}
              signedIn={signedIn}
              handleSignInChange={this.handleSignInChange}
              handleSignIn={this.handleSignIn}
            />}
          />
          <Route path="/sign-up" render={(props) =>
            <SignUp
              {...props}
              signUp={signUp}
              signedIn={signedIn}
              handleSignUpChange={this.handleSignUpChange}
              handleSignUp={this.handleSignUp}
            />}
          />
          <Route path="/jokes" render={(props) =>
            <Jokes
              {...props}
              jokes={jokes}
              signedIn={signedIn}
              getJokes={this.getJokes.bind(this)}
            />}
          />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
