import { useContext, createContext, useState } from 'react';

const modalContext = createContext({
    visible: false,
    show: ()=>{},
    hide: ()=>{},
    screenshotURL: null,
    resetScreenshotURL: ()=>{},
    setScreenshotURL: x=>{},
    liga: null,
    resetLiga: ()=>{},
    setLiga: x=>{}
});

const useLoading = ()=> useContext(modalContext);
export default useLoading;

export function ModalProvider(props){
    const [visible, setVisible] = useState(false);
    const [screenshotURL, setScreenshotURL] = useState(null);
    const [liga, setLiga] = useState(null);

    const show=()=>setVisible(true);
    const hide=()=>setVisible(false);

    const resetScreenshotURL =()=>setScreenshotURL(null);
    const resetLiga = ()=>setLiga(null);

    const data={
        visible,
        show,
        hide,
        screenshotURL,
        resetScreenshotURL,
        setScreenshotURL,
        liga,
        resetLiga,
        setLiga,
    };

    return (
        <modalContext.Provider value={data} {...props}/>
    );
};
