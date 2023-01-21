import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-8p1TY8Yz6gSSNwxP4lyJlL3y"
});

const openai = new OpenAIApi(configuration)

// change the promtPrefix to get output data from browser!




const generateAction = async (req, res) => {

    const basePromptPrefix  = `
        
        write a detailed articale with a writing style of a skilled copywriter,
        make the text humanlike, readable, use synnonims, use retoric and make sure its grammerly appealing,
        make the text very long and expand on the topic deeply,
        about the follwing title, description and use the table of contents to structure the article:

        title: ${req.body.promtAPIOutput}

        description: ${req.body.promtDescAPIOutput}

        table of contents: ${req.body.promtTableAPIOutput}

        highlight in the articale the following words: ${req.body.keysInput}

        articale: 
    `

    console.log(`API:${basePromptPrefix }${req.body.input}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}`,
        temperature: 0.8,
        max_tokens: 2500,
        frequency_penalty: 0.52,
        presence_penalty: 0.63,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    res.status(200).json({ 
        output: basePromptOutput,
     })

}


export default generateAction;