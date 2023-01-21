import React from 'react'

const OutputSection = ({ onChange, value, output, className, isGenerating, onClick }) => {
  return (
    
    <div>
        <h2 className='section-title'>Tittle Section</h2>
        <p className='section-desc'>insert Title Here and get Results!</p>
        <div className='prompt-boxes-container'>
            <div className={className}>
                <p className='output-text'>{output}</p>
            </div>
        </div>
        <div className="prompt-buttons">
              <a 
                className={ isGenerating ? "generate-button loading" : "generate-button" } 
                onClick={onClick}
              >
                <div className="generate">
                { isGenerating ? <span className="loader"></span> : <p>Generate</p> }
                </div>
              </a>
          </div>
    </div>

  )
}

export default OutputSection