import React from "react";

function card({ sp }) {
  console.log(sp);
  return (
    <div key={sp.taxonomy.id}>
      <button>
        <p>
          {sp.common_name} ({sp.taxonomy.species})
        </p>
      </button>
    </div>
  );
}

export default card;
