import { useContext, createContext, useState } from 'react';

const loadingContext = createContext({
    visible: false,
    setVisible: x=>{}
});
const useLoading = ()=> useContext(loadingContext);
export default useLoading;

export function LoadingProvider(props){
    const [visible, setVisible] = useState(false);
    const data={
        visible,
        setVisible
    };

    return (
        <loadingContext.Provider value={data} {...props}/>
    );
};
