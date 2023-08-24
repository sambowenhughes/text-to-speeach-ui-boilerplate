export async function POST(request: Request) {
  const requestBody = await request.json();

  if (!requestBody.modelUrl) {
    throw new Error("Missing 'model url' field in the request body");
  }

  if (!requestBody.input) {
    throw new Error("Missing 'input' field in the request body");
  }

  if (!process.env.HUGGING_FACE_TOKEN) {
    throw new Error("Missing 'Hugging Face Access Token'");
  }

  const modelUrl = requestBody.modelUrl;
  const input = requestBody.input;

  const response = await fetch(modelUrl, {
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: input }),
  });
  
  if(!response.ok){
    throw new Error("Request Failed")
  }

  const audioData = await response.arrayBuffer();

  return new Response(audioData,{
    headers:{
        "Content-Type":"audio/mpeg"
    }
  })

}
