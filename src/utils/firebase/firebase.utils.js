// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTwobXPOpT3x4S7cL2r4IzR3J4sJRll-g",
  authDomain: "react-course-capstone.firebaseapp.com",
  projectId: "react-course-capstone",
  storageBucket: "react-course-capstone.appspot.com",
  messagingSenderId: "766720728813",
  appId: "1:766720728813:web:baf3e3348323b59b6276e4",
  measurementId: "G-XCL8VE8S05"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize providers
const googleProvider = new GoogleAuthProvider();  // Google Auth Provider

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            console.log('error creating the user', error.message);

        }

        return userDocRef;
    }

    // if user data does not exist
    // create / set the document with the data from userAuth in my collection

    // if user data exists
    // return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password, displayName);
    
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

/*
# Data handling in collections on the Firestore DB
#
#
#
*/

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // Create the collection reference inside "db" database with a name "collectionKey"
    const collectionRef = collection(db, collectionKey);

    // Instantiate a batch operation, like a reference to the batch that will execute as a whole transaction
    const batch = writeBatch(db);

    // For loop for objects inside "objectToAdd"
    objectsToAdd.forEach((object) => {
        // Create a document reference for each object, first argument is the collection reference, second argument
        // is the name or title of the object (and document)
        const docRef = doc(collectionRef, object.title.toLowerCase());
        // Add the set to the batch "list of tasks" to execute
        batch.set(docRef, object);
    });

    // Run the batch asynchronously, waiting for the result to be returned
    await batch.commit();
    console.log('Done!')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;

}