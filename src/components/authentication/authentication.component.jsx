
import SignInForm from "../sign-in-form/sign-in-form.component";
import SignUpForm from "../sign-up-form/sign-up-form.component";

import './authentication.styles.scss';

const Authentication = () => {
    
    /* 
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(user);
    } 
    */

    // The redirect causes the whole app to unmount and remount anew after the Google sign-in.
    // This funcion is not doing anything once the app remounts.

    /* const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();
        console.log({ user });
        //const userDocRef = await createUserDocumentFromAuth(user);
    } */

    return(
        <div className="authentication-container">
                <SignInForm />
                <SignUpForm />
        </div>
    );
};

export default Authentication;