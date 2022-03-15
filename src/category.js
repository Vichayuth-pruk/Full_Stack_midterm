import {useState, useEffect} from 'react'
import axios from "axios"
import {Post} from "./post"
import { Link, Route, Routes, useParams, useLocation, Params } from 'react-router-dom'
import Home from './home'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Container } from 'react-bootstrap';
import {ResponsiveEmbed, Image} from 'react-bootstrap';


const Tag = () => {

    useEffect(() => {
        getData()
      }, [])
      const {id} = useParams();
      const [data, setData] = useState(null)
      const [data2, setData2] = useState(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
    
     
    
      async function getData() {

        await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
    .then((response) => {setData2(response.data)})
    .catch((error) => {console.error("Error fetching data:", error)
  setError(error)})
  .finally(() => {setLoading(false);})

    await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/categories')
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
      if(data2 == null || data == null){
          
      return (
        <Container><div><h1>LOADING...</h1></div></Container>
      )
    }
    
      
    if(data2 && data){
    
    console.log(id)
    console.log(data2[0].categories[0].toString())

    return(
        <>



        {data.filter(category => category.id.toString() === id).map((category, index) => 
    (
      <Container key={index} className="Category">
      <div>
          <h1>Category: {category.name}</h1>
          <h2>Count: {category.count}</h2>
          <h3>Category ID: {category.id}</h3>
          

      </div>
      </Container>
    ))
    }
    

    {data2.filter(posts => posts.categories.includes(Number(id))).map((posts ,index) => {

    let local_date = new Date(posts.date).toLocaleDateString()
    let time = new Date(posts.date).toLocaleTimeString()
    
    return(
        
        <Container key={index}>
        <div style={{backgroundColor: "#85CCF1 ", margin: 60, padding: 30, borderRadius:8}}>
            
            <h1>ID: {posts.id}</h1>
            <h2>Title: {posts.title.rendered}</h2>
            <h3>Post Date: {local_date}</h3>
            <h3>Post Time: {time}</h3>
            <div>
            <h5>
            Category ID: 
      {posts.categories.map((category, index) => (
        <span key={category}> {category} </span>
      ))}</h5>
              
          <Link to={`/Content/${posts.id}`}><Button variant="secondary">More Info</Button></Link>
          </div>
          </div>
          </Container>
        
    )})
      }
      
      </>
    )
      
    
      





}
}

export default Tag;