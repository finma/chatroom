import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { useHistory } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export default function Chats() {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const res = await fetch(url);
    const data = await res.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "d17d248d-4aa2-4b25-a640-824f66717015",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "adb8a62c-a979-48b1-a0b2-d06aae831987",
              },
            })
            .then(() => setLoading(false))
            .catch((err) => console.log(err));
        });
      });
  }, [user, history]);

  if (!user || loading) return <div></div>;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ChatRoom</div>
        <div className="logout-tab" onClick={handleLogout}>
          logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="d17d248d-4aa2-4b25-a640-824f66717015"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
