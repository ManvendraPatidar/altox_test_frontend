import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import axiosInstance from "../services/AxiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";

const DashboardPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPokemons, setLikedPokemons] = useState(new Set());
  const [totalPages, setTotalPages] = useState();
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const handleLikeToggle = (id) => {
    setLikedPokemons((prevLikes) => {
      const newLikes = new Set(prevLikes);
      newLikes.has(id) ? disLike(id) : addLike(id);
      return newLikes;
    });
  };

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

  const getPokemonsData = async () => {
    try {
      setIsLoading(false);
      const response = await axiosInstance.get("pokemons", {
        params: { limit: itemsPerPage, page: currentPage },
      });
      if (response) {
        setPokemons(response?.data?.pokemons);
        setTotalPages(response?.data?.totalPages);

        setLikedPokemons((prevLikes) => {
          const likedList = getLikedIds(response?.data?.pokemons);
          const newLikes = new Set(likedList);
          return newLikes;
        });
      }
    } catch (err) {
      console.error("Error in fetching pokemons", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getLikedIds = (data) => {
    return data.filter((item) => item.isLiked).map((item) => item.id);
  };

  const addLike = async (id) => {
    try {
      await axiosInstance.post("add-favorite-pokemon", {
        pokemonId: id,
      });

      setLikedPokemons((prevLikes) => {
        const newLikes = new Set(prevLikes);
        newLikes.add(id);
        return newLikes;
      });
    } catch (err) {
      toast.error("Something went wrong!!");
      console.error("Error in like pokemons", err);
    }
  };

  const disLike = async (id) => {
    try {
      await axiosInstance.post("remove-favorite-pokemon", {
        pokemonId: id,
      });

      setLikedPokemons((prevLikes) => {
        const newLikes = new Set(prevLikes);
        newLikes.delete(id);
        return newLikes;
      });
    } catch (err) {
      toast.error("Something went wrong!!");
      console.error("Error in dislike pokemons", err);
    }
  };

  useEffect(() => {
    if ((user, currentPage)) {
      getPokemonsData();
    }
  }, [user, currentPage]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>

      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-medium text-gray-700">
          {user?.Organization?.name}
        </div>

        <button
          onClick={() => {
            setShowModel(true);
          }}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <hr className="border-t-2 border-gray-300 mb-8" />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-3 py-3 sm:px-6 sm:py-3">
                {" "}
                <div className="h-full w-full flex justify-center">Sno</div>
              </th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">
                {" "}
                <div className="h-full w-full flex justify-center">Image</div>
              </th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">
                {" "}
                <div className="h-full w-full flex justify-center">Name</div>
              </th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">
                {" "}
                <div className="h-full w-full flex justify-center">
                  Like / Unlike
                </div>
              </th>
            </tr>
          </thead>

          {isLoading ? (
            <table className="w-[500px] mx-auto h-[400px]">
              <tbody className="w-full h-full">
                <tr className="w-full h-full">
                  <td colSpan={4} className="h-full  w-full text-center">
                    <div className="flex items-center justify-center w-full h-full">
                      <CgSpinner className="w-12 h-12 animate-spin text-gray-500" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : pokemons && pokemons.length > 0 ? (
            <tbody>
              {pokemons.map((pokemon, index) => (
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
                        src={pokemon?.imageUrl}
                        alt={pokemon?.name}
                        className="w-16 h-16 rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4 ">
                    {" "}
                    <div className="h-full w-full flex justify-center">
                      {pokemon?.name}
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <div className="h-full w-full flex justify-center">
                      <button
                        onClick={() => handleLikeToggle(pokemon?.id)}
                        className={`px-6 py-2 w-20 rounded-lg text-white hover:bg-opacity-80`}
                      >
                        {likedPokemons.has(pokemon.id) ? (
                          <FaHeart color="red" size={25} />
                        ) : (
                          <FaRegHeart color="black" size={25} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr className="odd:bg-white even:bg-gray-50 border-b  border-gray-200">
                <td
                  colSpan={4}
                  className="px-4 py-3 sm:px-6 sm:py-4 text-center"
                >
                  No pokemons available.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

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

      {showModel ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold">Confirm Logout</h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setShowModel(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/");
                  setShowModel(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DashboardPage;
