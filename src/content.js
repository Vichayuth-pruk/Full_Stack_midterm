
import {useState, useEffect} from 'react'
import axios from "axios"
import {Post} from "./post"
import { Link, Route, Routes, useParams, useLocation, Params } from 'react-router-dom'
import Home from './home'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Container, Form } from 'react-bootstrap';
import { CommentContext ,useComment } from './context/comment_context'






const Content = () => {

  useEffect(() => {
    getData()
  }, [])
  const {id} = useParams();
  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {comment, guest_comment} = useComment()
  const {addComment} = useComment()

  let textInput = React.createRef();



  const validate = ((posts_id, detail) => {

    console.log(posts_id)
    console.log(detail)
    if(detail === "" || detail[0] === " " || detail == null){
      alert("Please write comment correctly")
      textInput.current.value = ""
    }
    else{
      addComment({
        "posts_id": posts_id,"detail": detail
      })
      textInput.current.value = ""
    }

  })


  



  
 


 

  async function getData() {
    await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/users/')
    .then((response) => {setData2(response.data)})
    .catch((error) => {console.error("Error fetching data:", error)
  setError(error)})
  .finally(() => {setLoading(false);})

    await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
    .then((response) => {setData(response.data)})
    .catch((error) => {console.error("Error fetching data:", error)
  setError(error)})
  .finally(() => {setLoading(false);})




  }
  
  
    
  
  if (loading) {
    return (
      <Container> <h1><div>Loading...</div></h1></Container>
    )
  }
  if (error) {
    return (
      <Container> <h1><div>Error: {error.message}</div></h1></Container>
    )
  }
  if(data == null || data2 == null){
  return (
    <Container><div><h1>LOADING...</h1></div></Container>
  )
}

  
if(data && data2){


  if(data.filter(card => card.id.toString() === id).length === 0){
    return (
      <Container>
      <div>
        <h1>POST NOT FOUND</h1>
      </div>
      </Container>
    )
  }

  else{


  
  return(
    
    <>
    <Container>
    <div>
    {data.filter(card => card.id.toString() === id).map((card, index) => {

      let local_date = new Date(card.date).toLocaleDateString()
      let time = new Date(card.date).toLocaleTimeString()

    return(
      
      
      <div key={index} className="Content">
        <h2>Post ID:{card.id}</h2>

        {data2.filter(user => user.id.toString() === card.author.toString()).map((user, index) => ( 


          
           <div key={index} className="user">
            <h4>Author: {user.name}</h4>
          </div>

        ))}
        <h3>Date: {local_date}</h3>
        <h3>Time: {time}</h3>

        <h3>Title: {card.title.rendered}</h3>

        <div dangerouslySetInnerHTML={{ __html: card.content.rendered }}></div>



        <h1>COMMENT</h1>
          <Container>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          Write comment:
          </Form.Label>
          <Form.Control type="text" placeholder="Write your comment here" ref={textInput} style={{margin: 10}} required />
        
          <Button variant="primary" type="button"  onClick={() => validate(card.id, textInput.current.value)} >
    Submit
  </Button>
        </Form.Group>
        </Form>
        </Container>

    {comment.filter(comment => comment.post.toString() === card.id.toString()).map((comment, index) => {

    let local_date = new Date(comment.date).toLocaleDateString()
    let time = new Date(comment.date).toLocaleTimeString()
    
    return(

      <Container key={index}>

<div style={{backgroundColor: "#CF9955 ", margin: 60, padding: 30, borderRadius:8}}>
        
        <h2>Author Name: {comment.author_name}</h2>
        <h4>Date: {local_date}</h4>
        <h4>Time: {time}</h4>

        <h3>Comment Detail:<div style={{marginTop: 10}} dangerouslySetInnerHTML={{ __html: comment.content.rendered }}></div></h3>
        </div>

      </Container>


        
      )})}


      </div>

      
    )})
    }



      
    
      
    </div>
    </Container>
    
    </>
   
     
    
  
  )
}
}

}

export default Content;
