import React from "react"

function Navbar() {
  return (
    <nav>
        <div>
            <h3>LoGo</h3>
        </div>
        <div>
            <input className="search-box" placeholder="Seacrh Images" type="search" />
        </div>
        <div>
            Category's
        </div>
    </nav>
  )
};

export default Navbar;
