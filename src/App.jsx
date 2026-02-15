import { useEffect, useState } from 'react'
import { RedditResult } from './components/RedditResult';
import './App.css'

function App() {
  const [redditVal, setRedditVal] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  


  const [lanes, setLanes] = useState(() => {
    const saved = localStorage.getItem('subredditArr')
    if (saved){
      return JSON.parse(saved)
    } else {
      return []
    }
  });

  useEffect(() => {
    localStorage.setItem("subredditArr", JSON.stringify(lanes))
  }, [lanes])


  const searchRedditVal = () => {
  
    if (redditVal.trim() !== "" && lanes.length < 3 && !checkDuplicate(redditVal.trim())){
      fetchReddit(redditVal.trim())
      setRedditVal("")
    } else if (lanes.length === 3 && redditVal.trim() !== ""){
      alert("Максимальное количество subreddit")
    } else if (checkDuplicate(redditVal.trim())){
      alert("Такой subreddit уже есть")
      setRedditVal("")
    }
    

  }

  const fetchReddit = async (val) => {
    try{
      setLoading(true);
      setError(null);
      
      const apiUrl = `https://www.reddit.com/r/${val}.json`;
      const response = await fetch(apiUrl);
      if (!response.ok){
        throw new Error(`Undefined ${val} subreddit`);
      }


      const data = await response.json();

      if (lanes.length < 3 && !checkDuplicate(val)){
        setLanes([
          ...lanes,{
            id: Date.now(),
            subreddit: val,
            posts: data.data?.children.slice(0,3) || [],
          }
        ])
      }

    } catch (err){
      setError(err.message);
      console.log("Error receiving data:", err);
    } finally{
      setLoading(false);
    }

  }

  const deleteSubreddit = (deleteId) =>{
    setLanes(lanes.filter(lane => lane.id !== deleteId))
  }


  const refreshSubreddit = async (refresh, id) => {
    try{
      setLoading(true)

      const apiUrl = `https://www.reddit.com/r/${refresh}.json`

      const response = await fetch(apiUrl)

      if (!response.ok){
        throw new Error(`Undefined ${refresh} subreddit`)
      }

      const data = await  response.json()

      setLanes(lanes.map(lane => 
        lane.id === id ? {
          ...lane, posts: data.data?.children.slice(0,3) || []
        } : lane
      ))

    } catch(err){
      setError(err.message)
    } finally{
      setLoading(false)
    }
  }


  const checkDuplicate = (val) => {
    const res = lanes.some(lane => lane.subreddit.toLowerCase() === val.toLowerCase()) 

    if (res === false){
      return false
    }

    return true
  }


  return (
    <>
      <div className="cube"></div>

      <div className="card">
        <div className="input-container">
            <input 
            className="inpt" 
            type="text" 
            value={redditVal}
            onChange={(e) => setRedditVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchRedditVal()}/>
            <button
              onClick={searchRedditVal}
            >Add Subreddit</button>
        </div>

        {loading && <div className="loading">Loading...</div>}

        {error && <div className="err">Error: {error}</div>}

        <div className='cards-result'> 
          {lanes.map((v) => (

            <div className="result" key={v.id}>
              <button
              className='delete'
              onClick={() => deleteSubreddit(v.id)}
              >
                X
              </button>
              <button 
              className='refresh'
              onClick={() =>  refreshSubreddit(v.subreddit, v.id)}
              >
                🗘
              </button>
             
              <RedditResult 
                result={v.posts}
              />
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default App
