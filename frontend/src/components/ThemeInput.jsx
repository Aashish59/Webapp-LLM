import { useState } from "react";

function ThemeInput({onsubmit}){
  const [theme, setTheme]= useState("");
  const[error, setError]= useState("")

  const handleSubmit = (e) =>{
    e.preventDefault();

    if (!theme.trim){
      setError("Please Enter theme name ")
        return;
    }
    setError("");
    onsubmit(theme);
  }
  return <div className="theme-input-container">
    <h2>Generate your adventure</h2>
    <p>Enter a theme for your interactive story</p>

    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter a theme(e.g fantasy, scifi, space, medieval)"
          className={error ? 'error': ''} /*if there is an error we will highlight the box saying there is an error otherwise non*/
          />
          {error && <p className="error-text">{error}</p>} 
      </div>
      <button type="submit" className="generate-btn">
        Generate Story
      </button>
    </form>
  </div>
}
export default ThemeInput;
        

    
    

  


