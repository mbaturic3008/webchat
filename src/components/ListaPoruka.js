import React from "react";

import Poruka from "./Poruka";

function ListaPoruka(props) {
  const { poruke, aktivniKorisnik } = props;

  return (
    <ul className="poruke-lista">
      {poruke.map((poruka) => (
        <Poruka
          key={poruka.id}
          poruka={poruka}
          aktivniKorisnik={aktivniKorisnik}
        />
      ))}
    </ul>
  );
}

export default ListaPoruka;
