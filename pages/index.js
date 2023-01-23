import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

import { Header, OutputSection, PromtSection, PromtSectionXL } from '../components';

import { useState } from 'react';

const Home = () => {

  const [titleinput, setTitleInput] = useState('')
  const [keysInput, setKeysInput] = useState('')

  const typingTextEvent = (e) => {
    console.log(e.target.value)
    setTitleInput(e.target.value)
  }


  const typingKeyWordsEvent = (e) => {
    console.log(e.target.value)
    setKeysInput(e.target.value)
  }

  /* @koopi get this to a diferrent compnennt or
   use it as hook */

  const [promtAPIOutput, setpromtAPIOutput] = useState('') 
  const [promtDescAPIOutput, setpromtDescAPIOutput] = useState('') 
  const [promtTableAPIOutput, setpromtTableAPIOutput] = useState('') 
  const [promtArticleAPIOutput, setpromtArticleAPIOutput] = useState('') 
  const [isGenerating, setIsGenerating] = useState(false)

  console.log(promtDescAPIOutput)

  const callGenerateTitle = async () => {

    setIsGenerating(true);

    console.log("Calling OpenAI...")

    const response = await fetch('/api/generateTitle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titleinput, keysInput }),
      });

    const data = await response.json();

    const { output } = data;

    console.log("OpenAI replied...", output.text)
    
    setpromtAPIOutput(
      `Titles:${output.text}\r\n `
      );

    setIsGenerating(false);
  }

  const callGenerateDesc = async () => {

    setIsGenerating(true);

    console.log("Calling OpenAI...")

    const response = await fetch('/api/generateDesc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promtAPIOutput, keysInput }),
      });

    const data = await response.json();

    const { output } = data;

    console.log("OpenAI replied...", output.text)
    
    setpromtDescAPIOutput(
      `Description: ${output.text} `
      );

    setIsGenerating(false);
  }

  const callGenerateTable = async () => {

    setIsGenerating(true);

    console.log("Calling OpenAI...")

    const response = await fetch('/api/generateTab', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promtAPIOutput, promtDescAPIOutput }),
      });

    const data = await response.json();

    const { output } = data;

    console.log("OpenAI replied...", output.text)
    
    setpromtTableAPIOutput(
      `Table of Content: \r\n${output.text}\r\n `
      );

    setIsGenerating(false);
  }

  const callGenerateArticle = async () => {

    setIsGenerating(true);

    console.log("Calling OpenAI...")

    const response = await fetch('/api/generateArt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promtAPIOutput, promtDescAPIOutput, promtTableAPIOutput, keysInput }),
      });

    const data = await response.json();

    const { output } = data;

    console.log("OpenAI replied...", output.text)
    
    setpromtArticleAPIOutput(
      `Article: \r\n${output.text}\r\n `
      );

    setIsGenerating(false);
  }


  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">

        <Header />

        <div>
          <PromtSection 
          className={'prompt-box'} 
          value={titleinput}
          keyValues={keysInput}
          onChange={typingTextEvent}
          onKeyChange={typingKeyWordsEvent}
          output={promtAPIOutput}
          isGenerating={isGenerating}
          onClick={callGenerateTitle}
          />
        </div>

        <div>
          <OutputSection
          className={'prompt-box2'} 
          value={titleinput} 
          onChange={typingTextEvent}
          output={promtDescAPIOutput}
          onClick={callGenerateDesc}
          isGenerating={isGenerating}
          />
        </div>

        <div>
          <OutputSection
          className={'prompt-box3'} 
          value={titleinput} 
          onChange={typingTextEvent}
          output={promtTableAPIOutput}
          onClick={callGenerateTable}
          isGenerating={isGenerating}
          />
        </div>

        <div>
          <OutputSection
          className={'prompt-box4'} 
          value={titleinput} 
          onChange={typingTextEvent}
          output={promtArticleAPIOutput}
          onClick={callGenerateArticle}
          isGenerating={isGenerating}
          />
        </div>

      </div>

      
    </div>
  );
};

export default Home;
