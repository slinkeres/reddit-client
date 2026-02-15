import React from "react";
import  "../App.css";

export function RedditResult({result}){ 
    return (
        <>
            <div className="content">
                {result.map((v,i) => (
                   <div key={i} className="titleAuthorScore"> 
                        <a className="reddit-href" href={`https://reddit.com${v.data.permalink}`}>{v.data.title}</a>
                        <p>Author: {v.data.author}</p>
                        <p>{v.data.score}</p>
                        {i !== (result.length-1) && 
                            <hr />
                        }
                   </div>
                ))}
            </div>
        </>
    );
}   
