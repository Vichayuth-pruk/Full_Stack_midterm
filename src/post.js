import { useEffect, useState, useMemo } from "react"
import { Link, Route, Routes } from 'react-router-dom'
import Content from "./content"
import { Button, Row, Col, Container } from 'react-bootstrap';





export const Post = ({id, title, tag, date}) => {

    let local_date = new Date(date).toLocaleDateString()
    let time = new Date(date).toISOString().substr(11, 8);
     

    return(
      <>
      <Container>
    <div style={{backgroundColor: "#85CCF1 ", margin: 60, padding: 30, borderRadius:8}}>
        
        <h1>ID: {id}</h1>
        <h2>Title: {title}</h2>
        <h3>Post Date: {local_date}</h3>
        <h3>Post Time: {time}</h3>

        <div>
          <h5>
            Tags ID: 
      {tag.map((tag, index) => (
        <span key={tag}> {tag} </span>
      ))}</h5>
      <Link to={`/Content/${id}`}><Button variant="secondary">More Info</Button></Link>
      </div>

        
        
        
        
        
    </div>
    </Container>
    </>
    )

    
    
}