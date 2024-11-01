import React from "react";

function card({ sp }) {
  return (
    <div key={sp.taxonomy.id}>
      <p>{sp.common_name}</p>
    </div>
  );
}

export default card;
