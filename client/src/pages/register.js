import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { register } from '../store/actions/authActions'

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {}
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.auth.error
            }
        }
        return null
    }


    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
        let { name, email, password, confirmPassword } = this.state
        this.props.register({ name, email, password, confirmPassword }, this.props.history)

    }


    render() {
        let { name, email, password, confirmPassword, error } = this.state

        return (
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h1 className='text-center display-4'>Register Here</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className='form-group'>
                            <label htmlFor='name'>Name:</label>
                            <input
                                type='text'
                                className={error.name ? 'is-invalid form-control' : 'form-control'}
                                placeholder='Enter Your Name'
                                name='name'
                                id='name'
                                value={name}
                                onChange={this.changeHandler}
                            />
                            {error.name && <div className="invalid-feedback">
                                {error.name}
                            </div>
                            }
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input
                                type='email'
                                className={error.email ? 'is-invalid form-control' : 'form-control'}
                                placeholder='Enter Your Email'
                                name='email'
                                id='email'
                                value={email}
                                onChange={this.changeHandler}
                            />
                            {error.email && <div className="invalid-feedback">
                                {error.email}
                            </div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Passwoed:</label>
                            <input
                                type='password'
                                className={error.password ? 'is-invalid form-control' : 'form-control'}
                                placeholder='Enter Your Password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={this.changeHandler}
                            />
                            {error.password && <div className="invalid-feedback">
                                {error.password}
                            </div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='confirmPassword'>ComfirmPassword:</label>
                            <input
                                type='password'
                                className={error.confirmPassword ? 'is-invalid form-control' : 'form-control'}
                                placeholder='Enter Your ConfirmPassword'
                                name='confirmPassword'
                                id='confirmPassword'
                                value={confirmPassword}
                                onChange={this.changeHandler}
                            />
                            {error.confirmPassword && <div className="invalid-feedback">
                                {error.confirmPassword}
                            </div>}
                        </div>
                        <Link to='/login'>Already Have an Account ? Login</Link>
                        <button className='btn btn-primary my-3 d-block'>Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { register })(Register)
