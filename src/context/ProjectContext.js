import { createContext, useState } from "react";
import { useQuery } from "react-query";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
    const [sourceLang, setSourceLang] = useState("");
    const [targetLang, setTargetLang] = useState("");
    const [projectName, setProjectName] = useState("");

    const { isLoading, error, data } = useQuery("projectData", () =>
        fetch("http://localhost:8000/projects").then((res) => res.json())
    );

    return (
        <ProjectContext.Provider
            value={{
                sourceLang,
                setSourceLang,
                targetLang,
                setTargetLang,
                projectName,
                setProjectName,
                isLoading,
                error,
                data,
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    );
};
export default ProjectContextProvider;
