import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { tication } from "../services/AxiosInstance";

const DashboardPage = () => {
  // Dummy Pokemon data (60 items)
  const pokemons = Array.from({ length: 60 }, (_, index) => ({
    id: index + 1,
    name: `Pokemon ${index + 1}`,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));

  // State for pagination and liked Pokémon
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPokemons, setLikedPokemons] = useState(new Set());
  const itemsPerPage = 6;
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  // Get current items to show on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstItem, indexOfLastItem);

  // Handle like/unlike toggle
  const handleLikeToggle = (id) => {
    setLikedPokemons((prevLikes) => {
      const newLikes = new Set(prevLikes);
      newLikes.has(id) ? newLikes.delete(id) : newLikes.add(id);
      return newLikes;
    });
  };

  // Pagination Controls
  const handleNextPage = () => {
   
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>

      <div className="flex justify-between items-center mb-2">
        {/* Organization Name */}
        <div className="text-lg font-medium text-gray-700">
          Oragnization name
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {}}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <hr className="border-t-2 border-gray-300 mb-8" />

      {/* Pokemon Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-3 py-3 sm:px-6 sm:py-3"> <div className="h-full w-full flex justify-center">Sno</div></th>
              <th className="px-2 py-2 sm:px-6 sm:py-3"> <div className="h-full w-full flex justify-center">Image</div></th>
              <th className="px-2 py-2 sm:px-6 sm:py-3"> <div className="h-full w-full flex justify-center">Name</div></th>
              <th className="px-2 py-2 sm:px-6 sm:py-3"> <div className="h-full w-full flex justify-center">Like / Unlike</div></th>
            </tr>
          </thead>
          <tbody>
            {currentPokemons.map((pokemon, index) => (
              <tr
                key={pokemon.id}
                className="odd:bg-white even:bg-gray-50 border-b  border-gray-200"
              >
                <td className="px-4 py-3 sm:px-6 sm:py-4 ">
                <div className="h-full w-full flex justify-center">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                 </div> 
                </td>
                <td className="px-2 py-2 sm:px-6  ">
                <div className="h-full w-full flex justify-center">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-16 h-16 rounded-full"
                  />
                  </div>
                </td>
                <td className="px-2 py-2 sm:px-6 sm:py-4 "> <div className="h-full w-full flex justify-center">{pokemon.name}</div></td>
                <td className="px-2 py-4">
                    <div className="h-full w-full flex justify-center">
                    <button
                    onClick={() => handleLikeToggle(pokemon.id)}
                    className={`px-6 py-2 w-20 rounded-lg text-white hover:bg-opacity-80`}
                  >
                    {likedPokemons.has(pokemon.id) ? <FaHeart color="red" size={25} /> : <FaRegHeart color="black" size={25} />}
                  </button>
                      </div> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center  mt-6 x">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-3 ${
            currentPage === 1
             ? "bg-transparent cursor-not-allowed"
              : "bg-transparent text-black hover:bg-gray-300"
          }`}
        >
         <MdOutlineKeyboardArrowLeft />
        </button>

        {[...Array(totalPages).keys()]
          .slice(Math.max(0, currentPage - 2), Math.max(3, currentPage + 1))
          .map((page) => (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-4 py-2  w-12 ${
                currentPage === page + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-blue-200`}
            >
              {page + 1}
            </button>
          ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-3  ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed h-full"
              : "bg-transparent text-black hover:bg-gray-300"
          }`}
        >
          <MdOutlineKeyboardArrowRight />

        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
