import React from "react";
import { useState, useEffect } from "react";

import ListaPoruka from "./components/ListaPoruka";
import "./App.css";
import Input from "./components/Input";

const postaviBoju = () => {
  const odabranaBoja = "#" + Math.random().toString(16).slice(-6);

  return odabranaBoja;
};

const postaviIme = () => {
  const slucajnoIme = ["Alex", "Bailey", "Charlie", "Dakota", "Ellis", "Finley", "Harley", "Jamie", "Jordan", "Kai", "Lane", "Morgan", "Parker", "Quinn", "Reese", "Riley", "Sage", "Skyler", "Taylor", "Tyler", "Avery", "Casey", "Drew", "Emerson", "Hayden", "Jaden", "Jesse", "Peyton", "Rowan", "Sawyer"]; // prettier-ignore
  const odabranoIme =
    slucajnoIme[Math.floor(Math.random() * slucajnoIme.length)];

  return odabranoIme;
};

function App() {
  const [webchat, setWebchat] = useState({
    member: { boja: postaviBoju(), korIme: postaviIme() },
    messages: [],
  });
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    async function inicijalizirajKorisnika() {
      const drone = await new window.Scaledrone("dOdHzyUVOcf4LIye", {
        data: webchat.member,
      });

      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }

        setWebchat((prethodniWebchat) => ({
          ...prethodniWebchat,
          member: { ...prethodniWebchat.member, id: drone.clientId },
        }));
      });
      setDrone(drone);
    }

    inicijalizirajKorisnika();
  }, []);

  useEffect(() => {
    if (drone) {
      const room = drone.subscribe("observable-room");
      room?.on("message", (message) => {
        const { data, member } = message;

        setWebchat((prethodniWebchat) => ({
          ...prethodniWebchat,
          messages: [
            ...prethodniWebchat.messages,
            {
              id: Math.floor(Math.random() * 10000000000),
              text: data,
              member: member,
            },
          ],
        }));
      });
    }
  }, [drone, webchat]);

  const onSlanjePoruke = (message) => {
    if (drone) {
      drone.publish({
        room: "observable-room",
        message: message,
      });
    }
  };

  return (
    <div className="App">
      <ListaPoruka poruke={webchat.messages} aktivniKorisnik={webchat.member} />
      <Input boja={webchat.member.boja} onSlanjePoruke={onSlanjePoruke} />
    </div>
  );
}

export default App;
