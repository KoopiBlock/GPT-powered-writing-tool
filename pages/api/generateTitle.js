import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-8p1TY8Yz6gSSNwxP4lyJlL3y"
});

const openai = new OpenAIApi(configuration)


const basePromptPrefix  = "Generate an Awsome Title, optimize it to rank it SEO to the higest ranking with the  dont use more than 30 words in the title, make the title eye catching, use click bait for this topic below: ";

const basePromtKeyPrefix = "use and highlight the key words: "

const generateAction = async (req, res) => {

    console.log(`API:${basePromptPrefix }${req.body.titleinput}, ${basePromtKeyPrefix}${req.body.keysInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix }${req.body.input}, ${basePromtKeyPrefix}${req.body.keysInput}`,
        temperature: 0.9,
        max_tokens: 115,
        frequency_penalty: 0.52,
        presence_penalty: 0.63,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    res.status(200).json({ 
        output: basePromptOutput,
     })

}


export default generateAction;