const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ debug: true });
const fs = require("fs");

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
const api_k = process.env.api;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

https: app.get("/", (req, res) => {
  console.log("Hii");
  res.send("Hii");
});

async function convertPDFtoText() {
  try {
    const pdfData = fs.readFileSync("sakshi.pdf");
    const base64PDF = pdfData.toString("base64");

    const requestBody = {
      Parameters: [
        {
          Name: "File",
          FileValue: {
            Name: "sakshi.pdf",
            Data: base64PDF,
          },
        },
        {
          Name: "StoreFile",
          Value: true,
        },
      ],
    };

    const response = await fetch(
      `https://v2.convertapi.com/convert/pdf/to/txt?Secret=${api_k}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const responseData = await response.json();

    if (responseData.Files && responseData.Files.length > 0) {
      const convertedTextFileUrl = responseData.Files[0].Url;

      const textResponse = await fetch(convertedTextFileUrl);
      const textData = await textResponse.text();

      return textData;
    } else {
      console.error("Error converting PDF to text:", responseData.Error);
    }
  } catch (error) {
    console.error("Error converting PDF to text:", error);
  }
}

let convertedText;
convertPDFtoText()
  .then((text) => {
    convertedText = text;
  })
  .catch((error) => {
    console.error(error.message);
  });

// route for API call
app.get("/:q", async (req, res) => {
  // q is the query(request) recieved from the frontend when the user types the text
  const text = req.params.q;
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: convertedText,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Sakshi lives in Bina and hails from Rewa, Madhya Pradesh. She has a fondness for both reading books and exploring new destinations through travel ",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: text,
          },
        ],
      },
    ],
  };

  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const data = await response.json();
  // console.log(data);
  res.send(data);
});

app.listen(5000, () => {
  console.log("server is running");
});
