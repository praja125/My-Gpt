import React, { useState } from "react";
import { useAppcontext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import moment from "moment";

const Sidebar = ({isMenuOpen, setIsMenuOpen}) => {
  const { chats, setSelectedChat, theme, setTheme, user, navigate } =
    useAppcontext();
  const [search, setSearch] = useState('');

  return (
    <div className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609f]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>

      {/* Logo */}
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        alt="Logo"
        className="w-full max-w-44 mx-auto"
      />

      {/* New chat button */}
      <button className="flex justify-center items-center w-full py-2 mt-8 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm font-medium rounded-lg shadow-md hover:opacity-90 transition-all">
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search Conversations */}
      <div className="flex items-center gap-2 p-3 mt-6 border border-gray-300 dark:border-white/20 rounded-lg bg-white/40 dark:bg-white/10 backdrop-blur-md">
        <img src={assets.search_icon} className="w-4 not-dark:invert" alt="Search" />
        <input
          type="text"
          placeholder="Search conversation..."
          className="flex-1 text-xs placeholder:text-gray-500 bg-transparent outline-none"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && (
        <p className="mt-5 text-xs uppercase text-gray-500 tracking-wide">
          Recent Chats
        </p>
      )}
      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0].content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              
              key={chat._id}
              onClick={() => {navigate('/');setSelectedChat(chat); setIsMenuOpen(false)}}
              className="p-3 px-4 dark:bg-[#57317C]/10 border border-gray-200 dark:border-[#80609F]/20 rounded-lg cursor-pointer flex justify-between group hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            >
              <div className="flex flex-col">
                <p className="truncate w-40 font-medium">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <img
                src={assets.bin_icon}
                className="hidden group-hover:block w-4 cursor-pointer dark:invert"
                alt="Delete"
              />
            </div>
          ))}
      </div>

      {/* Community Images */}
      <div
        onClick={() => {
          navigate("/community"); setIsMenuOpen(false)
        }}
        className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
      >
        <img src={assets.gallery_icon} className="w-5 not-dark:invert" alt="" />
        <p className="text-sm font-medium">Community Images</p>
      </div>

      {/* Credits */}
      <div
        onClick={() => {
          navigate("/credits"); setIsMenuOpen(false)
        }}
        className="flex items-center gap-3 p-3 mt-3 border border-gray-300 dark:border-white/15 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
      >
        <img src={assets.diamond_icon} className="w-5 dark:invert" alt="" />
        <div className="flex flex-col text-sm">
          <p className="font-medium">Credits: {user?.credits}</p>
          <p className="text-xs text-gray-500">
            Purchase credits to use QuickPT
          </p>
        </div>
      </div>

      {/* Dark mode toggle */}
      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} className="w-5 not-dark:invert" alt="" />
          <p className="font-medium">Dark Mode</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-purple-600 transition-colors"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
        </label>
      </div>
      {/* User Account */}
      <div className='flex items-center gap-1 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group'>
        <img src={assets.user_icon} className='w-7 rounded-full' alt="" />
        <p className="flex-1 text-sm dark:text-primary truncate">
          {
            user ? user.name : 'login your account'
          }
        </p>
        {user && <img src={assets.logout_icon} className="h-5 cursor-pointer hidden not-dark:invert group-hover:block"/>}
      </div>
      <img onClick={()=> setIsMenuOpen(false)} src={assets.close_icon} className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert" alt="" />
    </div>
  );
};

export default Sidebar;
