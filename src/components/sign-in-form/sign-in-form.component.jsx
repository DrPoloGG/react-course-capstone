import { useState } from "react";
import { createUserDocumentFromAuth, signInUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"


import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''    
}

const signInWithGoogle = async () => {
    await signInWithGooglePopup();
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
            
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('The account does not exist.');    
                    break;
                case 'auth/wrong-password':
                    alert('Password is incorrect.');
                    break;
                default:
                    alert('There was an error signing in:', error.message);   
            }
       
        }
        
        //resetFormFields();
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput label = 'Email' inputOptions={{ 
                    required: true, 
                    type: 'email', 
                    onChange: handleChange, 
                    name: 'email', 
                    value: email 
                }} />
                <FormInput label = 'Password' inputOptions={{ 
                    required: true, 
                    type: 'password', 
                    onChange: handleChange, 
                    name: 'password', 
                    value: password 
                }} />
                <div className="buttons-container">
                    <Button type='submit' >Sign In</Button>
                    <Button type='button' buttonType='google' onClick={ signInWithGoogle }>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;