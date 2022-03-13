
import './App.css';
import {useState, useEffect} from 'react'
import axios from "axios"
import {Post} from "./post"
import { Link, Route, Routes, Navigate} from 'react-router-dom'
import Home from './home'
import Content from './content';
import Author from './author';
import Tag from './tag';
import Category from './category';
import React from 'react'
import { Navbar, Container, NavDropdown, Nav, LinkContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




const NoFind = () => (
  <div>
    <h2>PAGE NOT FOUND</h2>

  </div>
)

function App() {

  useEffect(() => {
    getData()
  }, [])

  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

 

  async function getData() {
    await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/tags')
    .then((response) => {setData(response.data)})
    .catch((error) => {console.error("Error fetching data:", error)
  setError(error)})
  .finally(() => {setLoading(false);})

  await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/categories')
    .then((response) => {setData2(response.data)})
    .catch((error) => {console.error("Error fetching data:", error)
  setError(error)})
  .finally(() => {setLoading(false);})



  }

  if (loading) {
    return (
      <div>
      <h1>LOADING...</h1>
    </div>
    )
  }
  if (error) {
    return (
      <div>Error: {error.message}</div>
    )
  }
  if(data == null || data2 == null)
  return (
    <div>
      <h1>LOADING...</h1>
    </div>
  )


  if(data && data2 ){

  
  return(
    <>

    
    
    
    

<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand as={Link} to="/">CMS-MK1</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/Author">Author</Nav.Link>
        <NavDropdown title="Tag" id="basic-nav-dropdown">
        {data.map((tag, index) => (
        <NavDropdown.Item as={Link} key={index} to={`/Tag/${tag.id}`}>{tag.name}</NavDropdown.Item>
        
      ))}

        </NavDropdown>

        <NavDropdown title="Category" id="basic-nav-dropdown">
        {data2.map((category, index) => (
        <NavDropdown.Item as={Link} key={index} to={`/Category/${category.id}`}>{category.name}</NavDropdown.Item>
        
      ))}
      </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Author' element={<Author/>}/>
      <Route path='/Tag/:id' element={<Tag/>}/>
      <Route path='/Category/:id' element={<Category/>}/>
      <Route path='/Content/:id' element={<Content/>}/>
      <Route path='404' element={<NoFind/>} exact/>
      <Route path='/*' element={<Navigate to='404'/>}/>
      </Routes>
      

      
   
     
    
  
  </>
  )
  }

}

export default App;
