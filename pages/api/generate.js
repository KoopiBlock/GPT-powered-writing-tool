import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-8p1TY8Yz6gSSNwxP4lyJlL3y"
});

const openai = new OpenAIApi(configuration)


const basePromptPrefix  = "Generate 2 Awsome Titles, optimize them to rank their SEO to the higest ranking with the  dont use more than 30 words in each title, make the title eye catching, use click bait for this topic below: ";

const basePromtKeyPrefix = "use and highlight the key words:"


const generateAction = async (req, res) => {

    console.log(`API:${basePromptPrefix }${req.body.input}, ${basePromtKeyPrefix}${req.body.keysInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix }${req.body.input}, ${basePromtKeyPrefix}${req.body.keysInput}`,
        temperature: 0.9,
        max_tokens: 115,
        frequency_penalty: 0.52,
        presence_penalty: 0.63,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    const secondPrompt = `
        generate me 3 meta description with the highest SEO optimization, write it in eye catching way for the title below: 
        ${basePromptOutput.text}

        make it no longer than 30 words!

        use and highlight the key words, order them to be grmmarly correct: ${req.body.keysInput}

        meta description:
    
    `                        
    const secondPromtCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        temperature: 0.9,
        max_tokens: 150,
    })  
    
    const secondPromptOutput = secondPromtCompletion.data.choices.pop()


    const thirdPromt = `

        Write me a detailed table of contents for a blog post with the title and description below

        title: ${basePromptOutput.text}

        meta description: ${secondPromptOutput.text}

        Table of Contents: 
        
    `
    const thirdPromtCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${thirdPromt}`,
        temperature: 0.91,
        max_tokens: 1220,   
    })     

    const thirdPromtOutput = thirdPromtCompletion.data.choices.pop()

    const forthPromt = `
        
        write a detailed articale with a writing style of a skilled copywriter,
        make the text humanlike, readable, use synnonims, use retoric and make sure its grammerly appealing,
        make the text very long and expand on the topic deeply,
        about the follwing title and the meta description and use the table of contents to structure the article:

        title: ${basePromptOutput.text}

        meta description: ${secondPromptOutput.text}

        highlight in the articale the following words: ${req.body.keysInput}

        articale: 
    `
    const forthPromtCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${forthPromt}`,
        temperature: 0.91,
        max_tokens: 1220,   
    })     

    const forthPromtOutput = forthPromtCompletion.data.choices.pop()

    res.status(200).json({ 
        output: basePromptOutput,
        seacondOutput: secondPromptOutput,
        thirdOutput: thirdPromtOutput,
        forthOutput: forthPromtOutput,
     })

}


export default generateAction;