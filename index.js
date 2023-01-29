// a express server, which will handle api requests coming in and respond back eith a json object, it will use body parser as well as cors
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-GWuUqffJqg2RilL1DsrRBvMa",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const {message} = req.body;
    const {expert} = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are ${expert}.
        Person: ${message}?
        Expert:`,
        max_tokens: 1000,
        temperature: 1,
    });

     console.log(response.data[0])
    if(response.data.choices[0].text){
        res.json({
            message: response.data.choices[0].text
    });
        
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});