import React from "react";

function Poruka(props) {
  const { poruka, aktivniKorisnik } = props;

  const { member, text } = poruka;
  const odlaznaPoruka = member && member.id === aktivniKorisnik.id;
  const klasaPoruka = odlaznaPoruka
    ? "poruke-poruka aktivniKorisnik"
    : "poruke-poruka";

  return (
    <li className={klasaPoruka}>
      <div>
        <div className="korIme">{member.clientData.korIme}</div>
        <div
          className="tekst"
          style={{ backgroundColor: member.clientData.boja }}
        >
          {text}
        </div>
      </div>
    </li>
  );
}

export default Poruka;
