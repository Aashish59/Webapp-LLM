import { useState, useEffect } from "react"; /*useState: React Hook that lets a component remember information between renders(The process of turning that data and your React components into something visible on the screen). useEffect: It's useful for synchronizing your component with an external system, such as fetching data from your FastAPI server.*/
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios';/*Axios is a JavaScript library for making HTTP requests. To retrieve the complete story from FastAPI.*/
import LoadingStatus from "./LoadingStatus"
import StoryGame from "./StoryGame";
import { API_BASE_URL } from "../util";



function StoryLoader(){
  const{id} = useParams();
  const navigate= useNavigate();
  const[story, setStory]= useState(null);/*Stores the story returned by FastAPI*/
  const[loading,setLoading]= useState(true)/*Tracks whether the story is loading*/
  const[error,setError]= useState(null)/*Stores a message if the request fails */ 

  useEffect(() => { /*Run loadStory() when the component mounts and whenever the story ID changes.*/
    loadStory(id)
  },[id])

  /* The async keyword allows your function to use await.*/
  const loadStory=async(storyID)=>{
    setLoading(true)
    setError(null)

    try{
      const response= await axios.get(`${API_BASE_URL}/stories/${storyID}/complete`)/*await lets the function wait for the HTTP request to settle without blocking the browser's main thread.While the request is pending, React can continue displaying the loading screen.*/
      setStory(response.data)
      setLoading(false)
    } catch(err){
      if(err.response?.status == 404){
        setError("Story not found")
      } else{
        setError("Failed to load story")
      }
    } finally{
        setLoading(false)
    }
  }

  const createNewStory=() => {
    navigate("/")
  }
  if(loading){
    return <LoadingStatus theme={"story"} />
  }

  if (error){
    return <div className="story-loader">
      <div className = "error-message">
        <h2>Story not found</h2>
        <p>{error}</p>
        <button onClick={createNewStory}>Go to story generator</button>
      </div>
    </div>
  }
  if(story){
    return <div className="story-loader">
      <StoryGame story={story} onNewStory={createNewStory}/>
    </div>

  }
}

export default StoryLoader;

