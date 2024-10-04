import appFirebase from "./firebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    get,
    set,
    query,
    child
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const connDB = getDatabase(app);