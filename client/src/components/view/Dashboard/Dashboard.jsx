import './Dashboard.css';
// import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sidenav from "./Sidenav";
import Dash from "./Dash";
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:5001");

const Dashboard = () => {
   
    return(
    <>
    <div className="dashboard">
    <div className="dashcompleft dashcomp">
    <Sidenav />    
    </div>
    <div className="dashcompright dashcomp">
      <Dash />
    </div>
    </div>
    </>
    )

    // const [input, setInput] = useState("");
    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     console.log('running');
    //     const handleIncomingMessage = (data) => {
    //         setMessages(prevMessages => [...prevMessages, data.input]);
    //         toast.success("Message Received");
    //     };

    //     socket.on("receive_message", handleIncomingMessage);

    //     return () => {
    //         socket.off("receive_message", handleIncomingMessage);
    //     };
    // }, []);

    // const sendMessage = () => {
    //     if (!input.trim()) {
    //         return;
    //     }

    //     socket.emit('chat_message', { input });
    //     toast.success("Message Sent");
    //     setInput('');
    // }

    // return (
    //     <div className="dashboard">
    //         <div className="dashboard-Cont">
    //             <h2>Chat Room</h2>
    //             <div className="messages">
    //                 <ul className="message-List">
    //                     {messages.map((message, index) => (
    //                         <li key={index}>{message}</li>
    //                     ))}
    //                 </ul>
    //             </div>
    //             <div className="input">
    //                 <input
    //                     type="text"
    //                     name="message"
    //                     placeholder="Enter your message here..."
    //                     value={input}
    //                     onChange={(e) => setInput(e.target.value)}
    //                 />
    //                 <button onClick={sendMessage}>Send</button>
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default Dashboard;
