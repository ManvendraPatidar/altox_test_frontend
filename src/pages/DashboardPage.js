import React, { useContext, useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import axiosInstance from "../services/AxiosInstance";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import LogoutModel from "../components/LogoutModel";
import DashboardHeader from "../components/DashboardHeader";

const DashboardPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPokemons, setLikedPokemons] = useState(new Set());
  const [dislikedPokemons, setDislikedPokemons] = useState(new Set());
  const [totalPages, setTotalPages] = useState();
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const handleLikeDislikeToggle = (id, type) => {
    if (type === "like") {
      if (likedPokemons.has(id)) {
        removeLike(id);
      } else {
        addLike(id);
        if (dislikedPokemons.has(id)) {
          removeDislike(id);
          dislikedPokemons.delete(id);
        }

        setDislikedPokemons(new Set(dislikedPokemons));
      }
    } else if (type === "dislike") {
      if (dislikedPokemons.has(id)) {
        removeDislike(id);
      } else {
        addDislike(id);

        if (likedPokemons.has(id)) {
          removeLike(id);
          likedPokemons.delete(id);
        }

        setLikedPokemons(new Set(likedPokemons));
      }
    }
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

        setLikedPokemons(() => {
          const likedList = getLikedIds(response?.data?.pokemons);
          const newLikes = new Set(likedList);
          return newLikes;
        });

        setDislikedPokemons(() => {
          const DislikedList = getDislikedIds(response?.data?.pokemons);
          const newLikes = new Set(DislikedList);
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

  const getDislikedIds = (data) => {
    return data.filter((item) => item.isDisliked).map((item) => item.id);
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

  const removeLike = async (id) => {
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

  const addDislike = async (id) => {
    try {
      await axiosInstance.post("dislike-pokemon", {
        pokemonId: id,
      });

      setDislikedPokemons((prevLikes) => {
        const newLikes = new Set(prevLikes);
        newLikes.add(id);
        return newLikes;
      });
    } catch (err) {
      toast.error("Something went wrong!!");
      console.error("Error in like pokemons", err);
    }
  };

  const removeDislike = async (id) => {
    try {
      await axiosInstance.post("remove-dislike-pokemon", {
        pokemonId: id,
      });

      setDislikedPokemons((prevLikes) => {
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
    if (user && currentPage) {
      getPokemonsData();
    }
  }, [user, currentPage]);

  return (
    <div className="relative">
      <DashboardHeader setShowModel={setShowModel} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center md:justify-between items-center mb-2">
          <div className="text-lg font-medium text-gray-700 hidden md:inline">
            Pokemons
          </div>
          <div className="text-lg font-bold text-gray-700 ">
            {user?.Organization?.name}
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-8" />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
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
                    Like / Dislike
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
                      <div className="h-full w-full flex justify-center space-x-2">
                        {/* Like Button */}
                        <button
                          onClick={() =>
                            handleLikeDislikeToggle(pokemon.id, "like")
                          }
                        >
                          {likedPokemons.has(pokemon.id) ? (
                            <FaThumbsUp
                              size={25}
                              className="text-blue-950 scale-110"
                            />
                          ) : (
                            <FaRegThumbsUp
                              size={25}
                              className="text-gray-950"
                            />
                          )}
                        </button>

                        {/* Dislike Button */}
                        <button
                          onClick={() =>
                            handleLikeDislikeToggle(pokemon.id, "dislike")
                          }
                        >
                          {dislikedPokemons.has(pokemon.id) ? (
                            <FaThumbsUp
                              size={25}
                              className="text-blue-950 scale-110 rotate-180"
                            />
                          ) : (
                            <FaRegThumbsUp
                              size={25}
                              className="text-blue-950 rotate-180"
                            />
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
        <div className="w-full flex justify-between items-center  mt-2 ">
          <span>
            {currentPage} of {totalPages} Pages{" "}
          </span>

          <div className="flex justify-center items-center">
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
              .slice(
                currentPage === totalPages
                  ? Math.max(0, currentPage - 3)
                  : Math.max(0, currentPage - 2),
                Math.max(3, currentPage + 1)
              )
              .map((page) => (
                <button
                  key={page + 1}
                  onClick={() => setCurrentPage(page + 1)}
                  className={`px-4 py-2  w-12 ${
                    currentPage === page + 1
                      ? "bg-blue-950 text-white"
                      : "bg-gray-200 text-gray-800"
                  } hover:bg-blue-200`}
                >
                  {page + 1}
                </button>
              ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-3 ${
                currentPage === totalPages
                  ? "bg-transparent cursor-not-allowed"
                  : "bg-transparent text-black hover:bg-gray-300"
              }`}
            >
              <MdOutlineKeyboardArrowRight />
            </button>
          </div>
        </div>
        {showModel ? <LogoutModel setShowModel={setShowModel} /> : <></>}
      </div>
    </div>
  );
};

export default DashboardPage;
