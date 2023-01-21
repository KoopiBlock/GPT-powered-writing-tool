import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-8p1TY8Yz6gSSNwxP4lyJlL3y"
});

const openai = new OpenAIApi(configuration)



const generateAction = async (req, res) => {

    // change the promtPrefix to get output data from browser!
    const basePromptPrefix  = `
    generate me a meta description with the highest SEO optimization, write it in eye catching way for the title below: 
    ${req.body.promtAPIOutput}

    make it no longer than 30 words!

    use and highlight the key words, order them to be grmmarly correct: ${req.body.keysInput}

    meta description:

    `       
    console.log(`API:${basePromptPrefix }`)

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