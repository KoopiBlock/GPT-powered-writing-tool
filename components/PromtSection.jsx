import React from 'react'

const PromtSection = ({ onChange, value, output, keyValues, onKeyChange, isGenerating, onClick }) => {
  return (
    <div>
        <div>
            <h2 className='section-title'>Tittle Section</h2>
            <p className='section-desc'>insert Title Here and get Results!</p>
            <div className='prompt-boxes-container'>
                <div className='inputs-container'>
                    <div className='prompt-box1'>
                        <textarea 
                            placeholder='write topic here'
                            className='input-box' 
                            value={value}
                            onChange={onChange}
                        />
                    </div>
                    <div className='prompt-box1'>
                        <textarea 
                            placeholder='write key words here'
                            className='input-box' 
                            value={keyValues}
                            onChange={onKeyChange}
                        />
                    </div>
                </div>

                <div className='prompt-box'>
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
    </div>
  )
}

export default PromtSection