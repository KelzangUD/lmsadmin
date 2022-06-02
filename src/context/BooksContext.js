import { createContext } from "react";
import { useState, useEffect } from "react";

import BookServices from "../services/BookService";

const BooksContext = createContext();

export const BooksProvider = ({children})=>{
    const [booksData, setBooksData] = useState([]);
    useEffect(()=>{
        getAllBooks();
    },[])

    const getAllBooks = async()=>{
        const response = await BookServices.getAllBooks();
        setBooksData(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }   
    return(<BooksContext.Provider value={{
        booksData,
    }}>
        {children}
    </BooksContext.Provider>
    )
}

export default BooksContext;