import React from "react";
import classnames from "classnames";

const NavSidebarItem = ({ item, sidenavTab, setSidenavTab }) => {
  const toggleNavSidebarItem = (e, index) => {
    e.preventDefault();
    setSidenavTab(index);
  };
  return (
    <li className="nav-item nav-pills">
      <a
        className={classnames("nav-link", {
          active: sidenavTab === item.index
        })}
        role="tab"
        aria-selected={sidenavTab === item.index}
        aria-controls={"navbar-".concat(item.label.toLowerCase())}
        onClick={e => toggleNavSidebarItem(e, item.index)}
      >
        <i className={classnames("ni ni-single-copy-04", item.color)} />
        <span className="nav-link-text ml-3">{item.label}</span>
      </a>
    </li>
  );
};

export default NavSidebarItem;
