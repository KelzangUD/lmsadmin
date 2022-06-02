import BookService from "../services/BookService";

import { useEffect,useState } from "react";
const BooksList = ()=>{
    const [bookData, setBookData] = useState([]);
    useEffect(()=>{
        getAllBook();
    },[])
    const getAllBook = async()=>{
        const response = await BookService.getAllBooks();
        setBookData(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    // console.log(bookData);
    return (
        <>
            <h1 className="flex">BOOKS LIST</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Sl.No</th>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3">Author(s)</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Publisher</th>
                    <th scope="col" className="px-6 py-3">Available</th>
                </tr>
            </thead>
            <tbody>
                    {
                        bookData.map((item, index)=>(
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4">{index+1}</th>
                                <th scope="row" className="px-6 py-4">{item.title}</th>
                                <td className="px-6 py-4">{item.authors.map((item)=>(<span className="pr-2">{item}</span>))}</td>
                                <td className="px-6 py-4">{item.categories}</td>
                                <td className="px-6 py-4">{item.publisher}</td>
                                <td className="px-6 py-4">{item.available?"YES":"NO"}</td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
        </>
    )
}
export default BooksList;