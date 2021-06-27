import { createContext, useState } from "react";
import { useQuery } from "react-query";

export const BibleContext = createContext();

const BibleContextProvider = (props) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("");

    const { isLoading, error, data } = useQuery("bibleData", () =>
        fetch("http://localhost:8000/bible").then((res) => res.json())
    );

    return (
        <BibleContext.Provider
            value={{
                name,
                setName,
                code,
                setCode,
                language,
                setLanguage,
                isLoading,
                error,
                data,
            }}
        >
            {props.children}
        </BibleContext.Provider>
    );
};
export default BibleContextProvider;
