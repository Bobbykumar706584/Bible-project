import { createContext, useState } from "react";
import { useQuery } from "react-query";

export const LanguageContext = createContext()

const LanguageContextProvider = (props) => {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [direction, setDirection] = useState('')

    const { isLoading, error, data } = useQuery('languageData', () =>
     fetch('http://localhost:8000/languages').then(res =>
       res.json()
     ))

    return(
        <LanguageContext.Provider value={{ 
            name,
            setName,
            code,
            setCode,
            direction,
            setDirection,
            isLoading,
            error,
            data,
            }}>
            {props.children}
        </LanguageContext.Provider>
    )
}
export default LanguageContextProvider;