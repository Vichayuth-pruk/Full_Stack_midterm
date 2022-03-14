import { createContext, useCallback, useMemo, useContext, useState, useEffect } from "react";
import axios, { Axios } from "axios"

export const CommentContext = createContext();



export const CommentProvider = ({ children }) => {

    useEffect(() => {
        getData()
      }, [])
  const [comment, setComment] = useState([])

async function getData() {

    await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/comments')
  .then((response) => {setComment(response.data)})

}

  
  




  


  const addComment = useCallback(
      
    (comment) => {

        let body = {

          post: comment.posts_id,
          parent: 0,
          author_name: "Guest",
          author_url: "",
          date: new Date().toISOString(),
          date_gmt: new Date().toISOString(),
          content: comment.detail,
          link: "",
          type: "comment",
          meta: [],
      };
      axios.post("https://fswd-wp.devnss.com/wp-json/wp/v2/comments", body, {
        headers: {
          Authorization: "Basic ZnN3ZDpmc3dkLWNtcw=="
        },
      })
      .then((res) => {
        console.log(res)
        window.location.reload(false)
        
      })
      .catch((error) => {
        console.log(error)
      })
     

      
    },
    
    [],
)
  

  
 
  const value = useMemo(
    () => ({
      comment,
      addComment,
    }),
    [comment, addComment]
  );
  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
};

export const useComment = () => useContext(CommentContext)
