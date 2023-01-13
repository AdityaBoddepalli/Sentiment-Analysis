import Link from "next/link";
import { useState, useEffect } from "react";

function sendForSentimentAnalysis(input: String) {
    let url = "./api/hello";
    url = url + "?" + "text" + "=" + input;
    let output: String = "";

    fetch(url).then((response) => {
        response.json().then((data) => {
            output = data.label;
        })
    });
    return output;
}


export async function getServerSideProps(context: { query: { text: String; }; }) {
    return {
        props: {
            text: context.query.text,
        }
    }
}

function Sentiment(props: { text: String; }) {

    const [output, setOutput] = useState('');

    useEffect(() => {
        let url = "./api/hello";
        url = url + "?" + "text" + "=" + props.text;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setOutput(data.label)
            })
    }, [])
    return (
        <>
            <div className="h-screen w-full bg-gradient-to-b from-black to-gray-800">
                <div className="flex flex-col px-6 py-6 items-center justify-center">
                    <h1 className="text-4xl text-white">
                        {props.text}
                    </h1>
                    <h1 className={`text-5xl ${(output === 'positive'? 'text-green-500': (output === 'neutral' ? 'text-yellow-400' : 'text-red-600'))}`}>
                        {output}
                    </h1>
                </div>
                <div className="mt-20 px-6 py-6 items-center">
                    <Link href='/'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-gray-800 font-semibold hover:text-white py-2 px-4 mr-6 border border-gray-400 rounded shadow">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Sentiment;