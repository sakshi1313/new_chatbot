"use client";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState(""); // input from the user.
  const [conversations, setConversations] = useState([]); // all the request by the user and response from the bot.
  const [isLoading, setIsLoading] = useState(false); // check loading for the API response

  const getResponse = async () => {
    try {
      setInputText("");
      {
        inputText && setIsLoading(true);
      }

      {
        inputText &&
          setConversations([
            ...conversations,
            {
              user: inputText,
              bot: null,
            },
          ]);
      }
      const filterResponse = (text) => {
        const hasMarkdown = /\*\*/.test(text);
        const hasNewline = /\n/.test(text);

        if (!hasMarkdown && !hasNewline) {
          return text;
        }
        let filteredText = text.replace(/\*\*/g, "");
        filteredText = filteredText.replace(/\n/g, "");
        filteredText = filteredText.replace(/\*/g, "\n•");

        return filteredText;
      };

      // const response = await fetch(`http://localhost:5000/${inputText}`);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Accessing the environment variable
      const response = await fetch(`${apiUrl}/${inputText}`);
      if (!response.ok) {
        throw new Error("Failed to fetch response from the bot");
      }
      const data = await response.json();
      setInputText("");

      console.log(data);

      setConversations([
        ...conversations,
        {
          user: inputText,
          bot: filterResponse(data.candidates[0].content.parts[0].text),
        },
      ]);
    } catch (error) {
      {
        inputText &&
          setConversations([
            ...conversations,
            {
              user: inputText,
              bot: "Sorry! I don't know....can only answer to text.",
            },
          ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setIsLoading(false);
    setConversations([]);
  };

  console.log(inputText);
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-white shadow-lg rounded-lg rounded-br-none rounded-tl-none rounded-bl-noneg p-0 w-96 "
        style={{
          borderTopRightRadius: "40px",
          borderBottomLeftRadius: "40px",
          width: "570px",
        }}
      >
        {/*Title */}
        <div className="relative">
          <div
            className="bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold rounded-lg rounded-br-none rounded-tl-none rounded-bl-none  py-3 px-6 w-full flex justify-between items-center"
            style={{ borderTopRightRadius: "35px" }}
          >
            <div>TalkToMe</div>
            <button
              onClick={clearChat}
              className="focus:outline-none hover:bg-red-600 rounded-full p-2 ml-auto"
            >
              X
            </button>
          </div>
        </div>
        {/*Feed section*/}
        <div
          style={{
            overflowY: "auto", //scroll
            overflowX: "hidden",
          }}
        >
          <div
            className="flex flex-col gap-6 mt-6"
            style={{
              height: "300px",
              // overflowY: "auto",
              // overflowX: "hidden",
            }}
          >
            {conversations.map((conversation, i) => (
              <div key={i}>
                {conversation.user !== null && (
                  <div
                    className="bg-white border border-pink-300 rounded-lg p-4 ml-52 shadow-md "
                    style={{ width: "350px" }}
                  >
                    {conversation.user}
                  </div>
                )}
                {conversation.bot !== null && (
                  <div
                    className="bg-white border border-pink-300 rounded-lg p-4 mt-6 ml-3 shadow-md"
                    style={{ width: "350px" }}
                  >
                    {conversation.bot}
                  </div>
                )}
              </div>
            ))}

            {/*Loading Animation*/}

            {isLoading && (
              <div className="flex items-center justify-center animate-pulse">
                <div className="h-2 w-2 bg-black rounded-full"></div>
                <div className="h-2 w-2 bg-black rounded-full ml-1"></div>
                <div className="h-2 w-2 bg-black rounded-full ml-1"></div>
              </div>
            )}
          </div>
        </div>

        {/*Text Input*/}

        <div className="flex mt-3 ">
          <textarea
            className="focus:outline-none border-t border-gray-200 rounded-lg rounded-br-none rounded-tr-none rounded-tl-none p-2 flex-1 resize-none"
            style={{ borderBottomLeftRadius: "35px" }}
            placeholder="Type something.."
            value={inputText}
            onChange={(evt) => setInputText(evt.target.value)}
          ></textarea>
          <button
            onClick={getResponse}
            className="bg-black hover:bg-gray-900 text-white font-bold rounded-br-none  rounded-bl-none py-1 px-2   ml-0"
          >
            ⇨
          </button>
        </div>
      </div>
    </div>
  );
}
