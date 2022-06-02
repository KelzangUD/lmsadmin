import { db } from "../firebase.config";

import {collection,getDocs} from "firebase/firestore";

const adminRef = collection(db, "users");
class LoginService {
    getAdminUserDetails = () => {
        return getDocs(adminRef);
      };
}

export default new LoginService();