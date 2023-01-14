import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

function EmotionTable({ props }: any) {
    return (
        <>
            <table className="w-full text-lg text-left text-white">
                <tbody className="">
                    <tr>
                        <td>Sadness</td>
                        <td>{props[0]}</td>
                    </tr>
                    <tr>
                        <td>Joy</td>
                        <td>{props[1]}</td>
                    </tr>
                    <tr>
                        <td>Fear</td>
                        <td>{props[2]}</td>
                    </tr>
                    <tr>
                        <td>Disgust</td>
                        <td>{props[3]}</td>
                    </tr>
                    <tr>
                        <td>Anger</td>
                        <td>{props[4]}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default EmotionTable;