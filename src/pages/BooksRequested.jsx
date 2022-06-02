import BookService from "../services/BookService";
import UserService from "../services/UserService";
import { useEffect,useState } from "react";
import { toast } from "react-toastify";

const BookRequested =()=>{
    const [booksRequested,setBooksRequested] = useState([]);
    const [users, setUsers] = useState([]);
    const [bookData, setBookData] = useState([]);
    useEffect(()=>{
        getAllBooksRequested();
        getAllUsers();
        getAllBook();
    },[])
    const getAllBooksRequested = async()=>{
        const response = await BookService.getAllRequestedBooks();
        setBooksRequested(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    const getAllUsers = async()=>{
        const response = await UserService.getAllUsers();
        setUsers(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    booksRequested.forEach(item=>{
        users.forEach(element=>{
            if(element.email===item.user){
                item.userName=element.name        
            }
        })
    })
    const getAllBook = async()=>{
        const response = await BookService.getAllBooks();
        setBookData(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    const acceptHandle =async(id,title,authors,userName, user,date,urgency,comment)=>{
        const acceptedData = {title,authors,userName,user,date,urgency,comment}
        console.log(id,title);
        let bookId="";
        bookData.map((item)=>{
            if(item.title===title){
                bookId = item.id
            }
        })
        let value={
            available: false,
        }
        try{
            await BookService.updateBookDetail(bookId,value);
            await BookService.assignedBooks(acceptedData);
            await BookService.deleteBookRequest(id);
            toast.success("Updated Successfully");
        }
        catch(err){
            toast.error("Error While accepting")
        }
        getAllBooksRequested();
    }
    const cancelRequest =async(id)=>{
        console.log(id);
        try{
            await BookService.deleteBookRequest(id);
        }
        catch(err){
            toast.error("Error while cancelling request");
        }
        getAllBooksRequested();
    }
    return (
        <>
            <h1 className="flex">BOOKS REQUESTED LIST</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Sl.No</th>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3">Author(s)</th>
                    <th scope="col" className="px-6 py-3">Booked By</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Urgency</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                    {
                        booksRequested.map((item, index)=>(
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4">{index+1}</th>
                                <th scope="row" className="px-6 py-4">{item.title}</th>
                                <td className="px-6 py-4">{item.authors.map((item)=>(<span className="pr-2">{item}</span>))}</td>
                                <td className="px-6 py-4">{item.userName}({item.user})</td>
                                <td className="px-6 py-4">{item.date}</td>
                                <td className="px-6 py-4">{item.urgency}</td>
                                <td className="px-6 py-4 flex">
                                <button onClick={()=>acceptHandle(item.id,item.title,item.authors, item.userName, item.user, item.date,item.urgency,item.comment)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">Accept</button>
                                <button onClick={()=>cancelRequest(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2">Decline</button>
                                </td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
        </>
    )
}
export default BookRequested;