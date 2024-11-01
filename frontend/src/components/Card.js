import React from "react";

function card({ sp }) {
  console.log(sp);
  return (
    <div key={sp.taxonomy.id}>
      <p>
        {sp.common_name} ({sp.taxonomy.species})
      </p>
    </div>
  );
}

export default card;
