import { createContext, useState } from "react";
import { useQuery } from "react-query";

export const VersionContext = createContext();

const VersionContextProvider = (props) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [revision, setRevision] = useState("");

    const { isLoading, error, data } = useQuery("versionData", () =>
        fetch("http://localhost:8000/versions").then((res) => res.json())
    );

    return (
        <VersionContext.Provider
            value={{
                name,
                setName,
                code,
                setCode,
                revision,
                setRevision,
                isLoading,
                error,
                data,
            }}
        >
            {props.children}
        </VersionContext.Provider>
    );
};
export default VersionContextProvider;
