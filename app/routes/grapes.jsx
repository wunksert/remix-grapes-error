import { useEffect, useState } from "react"


export const links= ()=> {
    return [
        {
            rel: 'stylesheet',
            href:'https://unpkg.com/grapesjs/dist/css/grapes.min.css',
            crossOrigin: "true"
        }
    ]
}

export default function Grapes(){

    const [editor, setEditor] = useState();

    useEffect(() => {

        const init = async () => {
            const {default : initEditor} = await import("../lib/grapes/editor")
            let newEditor = initEditor();
            setEditor(newEditor)
        }

        init()
    }, [])
  
    return(
        <>
            <h1>HELLO GRAPES</h1>
            <div id="gjs"></div>
        </>
      
    )
}