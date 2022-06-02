import BooksList from '../layout/BooksList';

const Home = ()=>{
    return(
        <div className="container mt-5">
            <main className='container relative overflow-x-auto'>
                <BooksList />        
            </main>
        </div>
    )
}
export default Home;