import { db } from "../firebase.config";

import {collection,getDocs,getDoc,updateDoc,deleteDoc,doc, addDoc} from "firebase/firestore";

const bookCollectionRef = collection(db, "books");
const bookRequestedRef = collection(db, "bookRequest");
const assignedBook = collection(db, "booksAssigned");
class BookDataService {

    getAllBooks = () => {
        return getDocs(bookCollectionRef);
    };
    addBooks = (newBook) => {
        return addDoc(bookCollectionRef, newBook);
    };
    updateBook = (id, updatedBook) => {
        const bookDoc = doc(db, "books", id);
        return updateDoc(bookDoc, updatedBook);
    };
    updateBookDetail=(id, value)=>{
        const bookDoc = doc(db, "books",id);
        return updateDoc(bookDoc, value);
    }
    deleteBook = (id) => {
        const bookDoc = doc(db, "books", id);
        return deleteDoc(bookDoc);
    };
    getBook = (id) => {
        const bookDoc = doc(db, "books", id);
        return getDoc(bookDoc);
    };
    getAllRequestedBooks = () => {
        return getDocs(bookRequestedRef);
    };
    deleteBookRequest = (id) => {
        const bookDoc = doc(db, "bookRequest", id);
        return deleteDoc(bookDoc);
    };
    getAllAssigned = () => {
        return getDocs(assignedBook);
    };
    assignedBooks = (newBook) => {
        return addDoc(assignedBook, newBook);
    };
}

export default new BookDataService();