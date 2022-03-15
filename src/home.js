import {useState, useEffect} from 'react'
import axios from "axios"
import {Post} from "./post"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';

function Home() {
    useEffect(() => {
      getData()
    }, [])
  
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
   
  
    async function getData() {
      await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
      .then((response) => {setData(response.data)})
      .catch((error) => {console.error("Error fetching data:", error)
    setError(error)})
    .finally(() => {setLoading(false);})
  
    }
    
    
      
    
    if (loading) {
      return (
        <div>Loading...</div>
      )
    }
    if (error) {
      return (
        <div>Error: {error.message}</div>
      )
    }
    if(data == null)
    return (
      <div>LOADING...</div>
    )
    return(
      <Container>

        <h1>CMS ALL POSTS</h1>
      
      <div>
        {data.map((post, index) => (
          <Post
            key={post.id}
            id={post.id}
            tag={post.tags}
            title={post.title.rendered}
            name={post.name}
            date={post.date}
            description={post.Description}
            price={post.price}
            index ={index}
          />
        ))}
        </div>

        </Container>
    )
  
  }
  
  export default Home;