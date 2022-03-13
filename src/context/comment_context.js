import { createContext, useCallback, useMemo, useContext, useState, useEffect } from "react";
import axios from "axios"

export const CommentContext = createContext();



export const CommentProvider = ({ children }) => {

    useEffect(() => {
        getData()
      }, [])
  const [comment, setComment] = useState([])
  const [guest_comment, setGuest_comment] = useState([])

async function getData() {

    await axios('https://fswd-wp.devnss.com/wp-json/wp/v2/comments')
  .then((response) => {setComment(response.data)})

}

  

  const addComment = useCallback(
      
      (comment) => {
          console.log(comment)
          var count = 1
         const new_comment = {
              "id": count,
              "posts_id": comment.posts_id,
              "name": "guest",
              "detail": comment.detail

          }
          count += 1

        setGuest_comment((prev) => [...prev, new_comment])
      },
      [],
  )

  
 
  const value = useMemo(
    () => ({
        guest_comment,
      comment,
      addComment,
    }),
    [comment, addComment, guest_comment]
  );
  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
};

export const useComment = () => useContext(CommentContext)
