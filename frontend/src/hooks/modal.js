import { useContext, createContext, useState } from 'react';

const modalContext = createContext({
    visible: false,
    setVisible: x=>{},
    screenshotURL: null,
    setScreenshotURL: x=>{}
});

const useLoading = ()=> useContext(modalContext);
export default useLoading;

export function ModalProvider(props){
    const [visible, setVisible] = useState(false);
    const [screenshotURL, setScreenshotURL] = useState(null);

    const show=()=>setVisible(true);
    const hide=()=>setVisible(false);

    const resetScreenshotURL =()=>setScreenshotURL(null);

    const data={
        visible,
        show,
        hide,
        screenshotURL,
        resetScreenshotURL,
        setScreenshotURL
    };

    return (
        <modalContext.Provider value={data} {...props}/>
    );
};
