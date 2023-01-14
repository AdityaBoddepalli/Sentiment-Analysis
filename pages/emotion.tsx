import Link from "next/link";
import { useState, useEffect } from "react";
import EmotionTable from "../components/emotiontable";

export async function getServerSideProps(context: { query: { text: String; }; }) {
    return {
        props: {
            text: context.query.text,
        }
    }
}

function Emotion(props: { text: String; }) {
    const [sadness, setSad] = useState(0);
    const [joy, setJoy] = useState(0);
    const [fear, setFear] = useState(0);
    const [disgust, setDisgust] = useState(0);
    const [anger, setAnger] = useState(0);

    useEffect(() => {
        let url = "./api/emotion_endpoint";
        url = url + "?" + "text" + "=" + props.text;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setSad(data.sadness);
                setJoy(data.joy);
                setFear(data.fear);
                setDisgust(data.disgust);
                setAnger(data.anger);
            })
    }, [])

    return (
        <>
        <div className="h-screen w-full bg-gradient-to-b from-black to-gray-800">
            <div className="flex flex-col px-6 py-6 items-center justify-center">
                <h1 className="text-4xl text-white py-6">
                    {props.text}
                </h1>
                <div className={`text-5xl text-white`}>
                    <EmotionTable props={[sadness, joy, fear, disgust, anger]}/>
                </div>
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
export default Emotion;