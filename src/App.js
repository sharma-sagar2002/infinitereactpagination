import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {

  const [posts,setPosts]= useState([]);
  const [page,setPage] =useState(1);
  const currentPostList = useRef([]);
  const fetchData = async ()=>{
    const res=await fetch('https://dummyjson.com/posts?limit=100');
    const data  =await res.json();
    console.log(data);
    if(data.posts&&data)
    setPosts(data.posts);
    currentPostList.current = data.posts.slice(0,10);
    console.log(currentPostList);

  }

  const fetchparticularPage = async (page) =>{
    const res =await fetch (`https://dummyjson.com/posts?limit=10&skip=${page*10}`);
    const data  =await res.json();
    console.log(data);
    if(data.posts && data) return data.posts;

  }
  const selectPageHandler = (selectedPage)=>{
   setPage(selectedPage);
  }

  const prevPageHandler = () => {
    (page>1) ? setPage(page-1) : alert("you are on first page");
    // if(isPresentInCurrentPostList(currentPostList.current,page-1)) {
         
    // }
    // else {
    //    const pageData= fetchparticularPage(page);   
    //    pageData.forEach(post => {
    //       currentPostList.current.push(post);
    //    });

    // }
  }

const nextPageHandler = ()=>{
  (page < posts.length/10) ? setPage(page+1) : alert("you are on last page")
}


  useEffect(()=>{
   fetchData();
  },[]);
  return (
   
    <div className="App">
    {/* <InfiniteScroll
    dataLength={this.state.items.length}
    next={this.nextHandler}
    hasMore={currentPostList.current.length!==posts.total} */}
    {/* loader={<h4>Loading...</h4>}
    > */}
      <div className='post-container'>
       {
          posts.slice(page*10 -10 , page*10).map((post )=>{
             return  (
              <div className='post-container__post' key={post.id}>
                  <h2>{post.title}</h2>
                  <p className='post__body'>{post.body}</p>
              </div>
             )
          })
        }
      </div>
      {/* </InfiniteScroll> */}
    

    {
      posts.length>0 && <div className='pagination'> 
      <span onClick={()=>{prevPageHandler()}} className='pagination__span '>Prev</span>
      {[...Array(posts.length/10)].map((_,index)=>{
             return <span key={index+1} onClick={()=> selectPageHandler(index+1)} className={`pagination__span ${page===index+1 ? 'pagination__selected': ''}`}>{index+1}</span>
      })}
      <span  onClick={()=>{nextPageHandler()}} className='pagination__span '>Next</span>
      </div>
    }
    </div>
  );
}

export default App;
