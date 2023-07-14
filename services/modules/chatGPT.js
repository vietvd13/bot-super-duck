const axios = require('axios');

async function handleAskChatGPT(question = "") {
  try {
    const TOKEN = process.env.CHAT_GPT_TOKEN;

    const HEADER = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    }

    const BODY = {
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: question
        }
      ]
    }

    const { data } = await axios.post("https://api.openai.vn/v1/chat/completions", BODY, { headers: HEADER });

    if (data) {
      console.log(data);

      const { choices } = data;

      if (Array.isArray(choices)) {
        if (choices.length > 0) {
          const { message } = choices[0];

          if (message) {
            const { content } = message;

            if (content) {
              return {
                status: true, 
                data: content
              };
            }
          }
        }
      }
    }

    return {
      status: false,
      data: error
    };
  } catch (error) {
    console.log("[ERROR] CALL API GET ELECTRIC");
    console.error(error);

    const status = error.response.status;
    const data = error.response.data.error;

    const res = {
      status,
      data: data || {
        message: "Đã có lỗi xảy ra!"
      }
    }

    return {
      status: false,
      data: res
    };
  }
}

module.exports = {
  handleAskChatGPT
}
