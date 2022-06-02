import { db } from "../firebase.config";

import {collection,getDocs} from "firebase/firestore";

const usersRef = collection(db, "users");
class UserService {
    getAllUsers = () => {
        return getDocs(usersRef);
    };
}
export default new UserService();