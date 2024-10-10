import {
  MoreVertical,
  TableOfContents,
  CirclePlus,
  PanelLeft,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

const sidebarItems = [
  {
    icon: <CirclePlus size={20} />,
    text: "Nuevo CFDI",
    alert: false,
    active: true,
    link: "/",
  },
  {
    icon: <TableOfContents size={20} />,
    text: "Historial CFDI",
    alert: true,
    active: false,
    link: "/vista-dos",
  },
];

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`p-2 fixed top-2 left-2 z-50 bg-gray-200 rounded-md sm:hidden ${
          expanded ? "hidden" : "block"
        }`}
      >
        <Menu />
      </button>

      {/** h-screen */}
      <aside
        className={`h-screen bg-white z-40 transform transition-transform duration-300 
            ${expanded ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0 sm:block sm:relative sm:shadow-none fixed`}
      >
        <nav className="h-full flex flex-col bg-[#FAFAFA] border-r shadow-sm">
          <div className="p-2 pt-4 flex justify-between items-center">
            <img
              src={"https://sandbox.factura.com/assets/images/favicon.png"}
              className={`overflow-hidden transition-all w-5`}
            />

            {expanded ? (
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <PanelLeft strokeWidth={1.5} />
              </button>
            ) : (
              ""
            )}
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 ">
              {sidebarItems.map((item, index) =>
                item.divider ? (
                  <hr className="" key={index} />
                ) : (
                  <SidebarItem
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    active={item.active}
                    alert={item.alert}
                    link={item.link}
                  />
                )
              )}
            </ul>
          </SidebarContext.Provider>

          {expanded ? (
            ""
          ) : (
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <PanelLeft strokeWidth={1.5} />
            </button>
          )}

          <div className="border-t flex p-1">
            <img src={profile} className="w-7 h-7 rounded-md" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-40 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">cristopher-exe</h4>
                <span className="text-xs text-gray-600">
                  cristopher@gmail.com
                </span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, link }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <Link to={link}>
      <li
        className={`relative flex items-center py-2 px-2 font-medium rounded-md cursor-pointer transition-colors group hover:bg-[#ECECEE] text-gray-600`}
      >
        {icon}
        {expanded ? (
          <span className={`overflow-hidden transition-all ml-3 text-sm`}>
            {text}
          </span>
        ) : (
          ""
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-[#ECECEE] text-inherit text-xs invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
