import Link from "next/link";
import { SetStateAction, useState } from "react";

function sendForSentimentAnalysis() {
    let url = ".";
    const text = document.getElementById("input");
    if (text != null) {
        url = url + "/sentiment?" + "text" + "=" + (text as HTMLInputElement).value;
    }
    let output: String = "";

    fetch(url).then((response) => {
        response.json().then((data) => {
            output = data.label;
            let color = "white";
            switch (output) {
                case "positive": color = "green"; break;
                case "negative": color = "red"; break;
                case "neutral": color = "yellow"; break;
                default: color = "black";
            }
        })
    });
    return output;
}

function MainPage() {
    const [message, setMessage] = useState('');

    const updateMessage = (textfield: { target: { value: SetStateAction<string>; }; }) => {
        setMessage(textfield.target.value);
    }

    return (
        <>
            <div className="h-screen w-full bg-gradient-to-b from-black to-gray-800">
                <div className="flex flex-col px-6 py-6 items-center justify-center">
                    <label className="block mb-2 text-sm font-medium text-white">
                        Sentiment Analysis
                    </label>
                    <textarea id="input" rows={4} className="mb-10 block p-2.5 w-1/2 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter some text:" onChange={updateMessage}></textarea>

                    <div className="flex flex-row px-6 px-y items-center justify-center">
                        <Link href={{
                            pathname: '/sentiment',
                            query: {
                                text: message,
                                // flag: true
                            },
                        }}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-gray-800 font-semibold hover:text-white py-2 px-4 mr-6 border border-gray-400 rounded shadow">
                                Sentiment
                            </button>
                        </Link>
                        <button className="bg-blue-500 hover:bg-blue-700 text-gray-800 hover:text-white font-semibold py-2 px-4 ml-6 border border-gray-400 rounded shadow">
                            Emotion
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}


export default MainPage;