import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
    errors: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  };

  componentDidMount() {
    const { auth, history } = this.props;
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { registerUser, history } = this.props;
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2,
    };

    registerUser(newUser, history);
  };

  render() {
    const { errors, name, email, password, password2 } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth, errors: state.errors }),
  { registerUser },
)(withRouter(Register));
