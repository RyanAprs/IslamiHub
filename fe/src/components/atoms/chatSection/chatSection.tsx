import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowRight, FaTrash, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ChatSection = ({ admin }) => {
  const [user_id, setUser_id] = useState();
  const [chat, setChat] = useState();
  const [dataChats, setDataChats] = useState([]);
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [community_id, setCommunity_id] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idChatToDelete, setIdChatToDelete] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/chat/${id}`
        );
        setDataChats(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    setCommunity_id(id);
    fetchChat();

    const userCookie = Cookies.get("userData");

    if (userCookie) {
      const userDataObj = JSON.parse(userCookie);
      setUser_id(userDataObj.user_id);
      setName(userDataObj.name);
    }
  }, [id]);

  const handleCreate = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/chat", {
        user_id,
        community_id,
        chat,
        name,
      });

      if (response.data.status_code === 200) {
        window.location.reload();
        console.log("create chat berhasil");
      } else {
        console.log("create chat gagal");
      }
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        console.log("No response received from server:", error.request);
      } else {
        console.log("Request error:", error.message);
      }
    }
  };

  const handleDelete = async (chatId) => {
    setIdChatToDelete(chatId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    console.log(idChatToDelete);

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/chat/${idChatToDelete}`
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Request error:", error);
    } finally {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col flex-grow ">
      <div className="w-full flex-grow overflow-y-auto  bg-main-gradient h-[40px]">
        <div className="flex items-center justify-center">
          created by {admin}
        </div>
        {dataChats && dataChats.length > 0 ? (
          dataChats.map((dataChat, index) =>
            dataChat.user_id === user_id ? (
              <div
                className="p-2 flex justify-end gap-2 items-start"
                key={index}
              >
                <div className="p-2 bg-white rounded-l-xl rounded-br-xl flex gap-4 flex-row-reverse justify-start items-center">
                  <div>
                    {/* <h1>{dataChat.name}</h1> */}
                    <p>{dataChat.chat}</p>
                  </div>
                  <div>
                    {user_id === dataChat.user_id ? (
                      <button onClick={() => handleDelete(dataChat.chat_id)}>
                        <FaTrash />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="p-2 flex justify-start gap-2 items-start"
                key={index}
              >
                <Link
                  to={`/profile/${dataChat.user_id}`}
                  className="h-7 w-7 bg-white flex items-center rounded-full justify-center cursor-pointer"
                >
                  {dataChat.image === null ? (
                    <FaUser />
                  ) : (
                    <img
                      src={`http://localhost:3000/${dataChat.image}`}
                      alt=""
                      className="rounded-full object-cover w-full h-full"
                    />
                  )}
                </Link>
                <div className="p-2 bg-white rounded-r-xl rounded-bl-xl flex gap-4 justify-center items-center">
                  <div>
                    <Link
                      to={`/profile/${dataChat.user_id}`}
                      className="hover:underline cursor-pointer"
                    >
                      {dataChat.name}
                    </Link>
                    <p>{dataChat.chat}</p>
                  </div>
                  <div>
                    {user_id === dataChat.user_id ? (
                      <button onClick={() => handleDelete(dataChat.chat_id)}>
                        <FaTrash />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="flex justify-center items-center">
            <h1>No Chat Posted</h1>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-200">
        {error && <p className="text-white bg-blue-500">{error}</p>}
        {user_id ? (
          <div className="flex gap-3 ">
            <input
              type="text"
              className="w-full p-4 rounded"
              placeholder="Message..."
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
            <button
              className="bg-white py-2 px-6 rounded-xl"
              onClick={handleCreate}
            >
              <FaArrowRight size={40} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-5 items-center">
            <h4>You Should Login For Chat</h4>
            <Link to="/login" className="bg-blue-400 px-3 py-2 rounded">
              Login
            </Link>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p>Are you sure want to delete this chat?</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition-colors duration-300"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
