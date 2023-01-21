import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-8p1TY8Yz6gSSNwxP4lyJlL3y"
});

const openai = new OpenAIApi(configuration)

// change the promtPrefix to get output data from browser!

const generateAction = async (req, res) => {

    const basePromptPrefix  = `

        Write me a detailed table of contents for a blog post with the title and description below

        titles: ${req.body.promtAPIOutput}

        meta description: ${req.body.promtDescAPIOutput}

        Table of Contents: 

    `

    console.log(`API:${basePromptPrefix }${req.body.promtAPIOutput},${req.body.promtDescAPIOutput} `)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}`,
        temperature: 0.9,
        max_tokens: 150,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    res.status(200).json({ 
        output: basePromptOutput,
     })

}


export default generateAction;