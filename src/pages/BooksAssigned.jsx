import BookService from "../services/BookService";
import BooksContext from "../context/BooksContext";
import { useEffect,useState, useContext } from "react";
import { toast } from "react-toastify";

const BooksAssigned =()=>{
    const [booksAssigned,setBooksAssigned] = useState([]);
    const {booksData} = useContext(BooksContext);
    // console.log(booksData)
    useEffect(()=>{
        getAllBooksAssigned();
    },[])
    const getAllBooksAssigned = async()=>{
        const response = await BookService.getAllAssigned();
        setBooksAssigned(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    const returnHandle =async(id,title)=>{
        console.log(id, title);
        let bookId="";
        booksData.map((item)=>{if(item.title===title){bookId = item.id}})
        let value={available: true,}
        try{
            await BookService.updateBookDetail(bookId,value);
            await BookService.deleteAssignedBook(id);
            toast.success("Updated Successfully");
        }
        catch(err){
            toast.error("Error While accepting")
        }
        getAllBooksAssigned();
    }
    return (
        <>
            <h1 className="flex">BOOKS ASSIGNED LIST</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Sl.No</th>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3">Author(s)</th>
                    <th scope="col" className="px-6 py-3">Booked By</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Urgency</th>
                    <th scope="col" className="px-6 py-3">Comment</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                    {
                        booksAssigned.map((item, index)=>(
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4">{index+1}</th>
                                <th scope="row" className="px-6 py-4">{item.title}</th>
                                <td className="px-6 py-4">{item.authors.map((item)=>(<span className="pr-2">{item}</span>))}</td>
                                <td className="px-6 py-4">{item.userName}({item.user})</td>
                                <td className="px-6 py-4">{item.date}</td>
                                <td className="px-6 py-4">{item.urgency}</td>
                                <td className="px-6 py-4">{item.comment}</td>
                                <td className="px-6 py-4 flex">
                                <button onClick={()=>returnHandle(item.id, item.title)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2">Returned</button>
                                </td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
        </>
    )
}
export default BooksAssigned;