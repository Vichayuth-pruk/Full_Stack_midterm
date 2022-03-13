import { useEffect, useState, useMemo } from "react"
import { Link, Route, Routes } from 'react-router-dom'
import Content from "./content"
import { Button, Row, Col, Container } from 'react-bootstrap';





export const Post = ({id, title, tag}) => {


     

    return(
      <>
      <Container>
    <div style={{backgroundColor: "#85CCF1 ", margin: 60, padding: 30, borderRadius:8}}>
        
        <h1>ID: {id}</h1>
        <h2>Title: {title}</h2>
        <div>
          <h5>
            Tags: 
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