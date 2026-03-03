const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION, // use us-east-1
});

async function callLlama(prompt) {
  try {
    const input = {
      modelId: "meta.llama3-8b-instruct-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: prompt,
        max_gen_len: 2000,
        temperature: 0.5,
        top_p: 0.9
      }),
    };

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);

    const responseBody = JSON.parse(
      new TextDecoder().decode(response.body)
    );

    return responseBody.generation;

  } catch (error) {
    console.error("Llama Invocation Error:");
    console.error(error);
    throw error;
  }
}

module.exports = callLlama;