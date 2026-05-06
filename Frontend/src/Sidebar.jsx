import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const {
        allThreads,
        setAllThreads,
        currThreadId,
        setNewChat,
        setPrompt,
        setReply,
        setCurrThreadId,
        setPrevChats
    } = useContext(MyContext);

    // ===============================
    // Fetch All Threads
    // ===============================
    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/thread");
            const res = await response.json();

            const filteredData = res.map(thread => ({
                threadId: thread.threadId,
                title: thread.title
            }));

            setAllThreads(filteredData);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    // ===============================
    // Create New Chat
    // ===============================
    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    };

    // ===============================
    // Change Thread
    // ===============================
    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(
                `http://localhost:5001/api/thread/${newThreadId}`
            );

            const res = await response.json();

            setPrevChats(res);
            setNewChat(false);
            setReply(null);

        } catch (err) {
            console.log(err);
        }
    };

    // ===============================
    // Delete Thread
    // ===============================
    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(
                `http://localhost:5001/api/thread/${threadId}`,
                { method: "DELETE" }
            );

            const res = await response.json();
            console.log(res);

            // Remove deleted thread from UI instantly
            setAllThreads(prev =>
                prev.filter(thread => thread.threadId !== threadId)
            );
            if(threadId === currThreadId){
                createNewChat();
            }

        } catch (err) {
            console.log(err);
        }
    };

    // ===============================
    // JSX
    // ===============================
    return (
        <section className="sidebar">

            <button onClick={createNewChat}>
                <img
                    src="src/assets/blacklogo.png"
                    alt="gpt logo"
                    className="logo"
                />
                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </button>

            <ul className="history">
                {allThreads?.map((thread, idx) => (
                    <li
                        key={idx}
                        onClick={() => changeThread(thread.threadId)}
                    >
                        {thread.title}

                        <i
                            className="fa-solid fa-trash"
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                            onClick={(e) => {
                                e.stopPropagation(); // prevent changing thread
                                deleteThread(thread.threadId);
                            }}
                        ></i>
                    </li>
                ))}
            </ul>

            <div className="sign">
                <p>By Kshirabdhi Tanaya &hearts;</p>
            </div>

        </section>
    );
}
export default Sidebar;




