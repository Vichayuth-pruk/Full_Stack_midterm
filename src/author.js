import {useState, useEffect} from 'react'
import axios from "axios"
import {Post} from "./post"
import { Link, Route, Routes, useParams, useLocation, Params } from 'react-router-dom'
import Home from './home'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Container } from 'react-bootstrap';
import {ResponsiveEmbed, Image} from 'react-bootstrap';



const Author = () => {

    useEffect(() => {
        getData()
      }, [])
      const {id} = useParams();
      const [data, setData] = useState(null)
      const [data2, setData2] = useState(null)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)
    
     
    
      async function getData() {
        await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/users/')
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
      if(data == null){
      return (
        <Container><div><h1>LOADING...</h1></div></Container>
      )
    }

    if(data){
        return(
            <>
            <Container>
            <h2>Author</h2>
            
            

            {data.map((author, index) => (
                <Container key={index}>
                    <div  style={{backgroundColor: "grey ", margin: 60, padding: 30, borderRadius:8}}>
                    <Image src={author.avatar_urls["96"]} responsive="true" roundedCircle />
                        <h1>Author ID: {author.id}</h1>
                        <h2>Author Name: {author.name}</h2>
                    </div>
                </Container>





            ))}
            </Container>

    
        </>
        )

    }

}

export default Author;