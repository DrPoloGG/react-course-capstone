
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import SignUpForm from "../sign-up-form/sign-up-form.component";

const SignIn = () => {
    
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(user);
    }

    // The redirect causes the whole app to unmount and remount anew after the Google sign-in.
    // This funcion is not doing anything once the app remounts.

    /* const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();
        console.log({ user });
        //const userDocRef = await createUserDocumentFromAuth(user);
    } */

    return(
        <div>
            <h1>Sign In Page</h1>
            <Button onClick={ logGoogleUser }>Sign in with Google Popup</Button>

            <SignUpForm />
        </div>
    );
};

export default SignIn;