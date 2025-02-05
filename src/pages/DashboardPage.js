import React, { useState } from "react";

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
          className="px-6 py-2 rounded-lg bg-red-400 text-white text-lg font-semibold hover:bg-red-500 transition-colors"
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
              <th className="px-6 py-3">Sno</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Like / Unlike</th>
            </tr>
          </thead>
          <tbody>
            {currentPokemons.map((pokemon, index) => (
              <tr
                key={pokemon.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-16 h-16 rounded-full"
                  />
                </td>
                <td className="px-6 py-4">{pokemon.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleLikeToggle(pokemon.id)}
                    className={`px-4 py-2 w-20 rounded-lg text-white ${
                      likedPokemons.has(pokemon.id)
                        ? "bg-red-500"
                        : "bg-blue-500"
                    } hover:bg-opacity-80`}
                  >
                    {likedPokemons.has(pokemon.id) ? "Unlike" : "Like"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages).keys()]
          .slice(Math.max(0, currentPage - 2), Math.max(3, currentPage + 1))
          .map((page) => (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-4 py-2 rounded-lg w-12 ${
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
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;

// import React, { useState } from "react";

// const DashboardPage = () => {
//   // Dummy user data
//   const userData = {
//     email: "user@example.com",
//     organization: "Pokemon World",
//   };

//   // Dummy Pokemon data (24 items)
//   const pokemons = Array.from({ length: 60 }, (_, index) => ({
//     id: index + 1,
//     name: `Pokemon ${index + 1}`,
//     image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//       index + 1
//     }.png`,
//   }));

//   // State for pagination and liked Pokémon
//   const [currentPage, setCurrentPage] = useState(1);
//   const [likedPokemons, setLikedPokemons] = useState(new Set()); // To track liked Pokemon
//   const itemsPerPage = 3;

//   // Get current items to show on the page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentPokemons = pokemons.slice(indexOfFirstItem, indexOfLastItem);

//   // Handle like/unlike toggle
//   const handleLikeToggle = (id) => {
//     setLikedPokemons((prevLikes) => {
//       const newLikes = new Set(prevLikes);
//       if (newLikes.has(id)) {
//         newLikes.delete(id); // If already liked, remove the like
//       } else {
//         newLikes.add(id); // If not liked, add the like
//       }
//       return newLikes;
//     });
//   };

//   const handleLogout = () => {
//     // Your logout logic here
//   };

//   // Pagination logic
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-4xl font-bold text-center mb-8 text-gradient">
//         Dashboard
//       </h1>
//   {/* Organization and Logout */}
//   <div className="flex justify-between items-center mb-2">
//     {/* Organization Name */}
//     <div className="text-lg font-medium text-gray-700">
//       {userData.organization}
//     </div>

//     {/* Logout Button */}
//     <button
//       onClick={handleLogout}
//       className="px-6 py-2 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors"
//     >
//       Logout
//     </button>
//   </div>

//       {/* Divider Line */}
//       <hr className="border-t-2 border-gray-300 mb-8" />

//       {/* Pokemon Table */}
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Sno
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Image
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Name
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentPokemons.map((pokemon, index) => (
//               <tr
//                 key={pokemon.id}
//                 className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
//               >
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   {index + 1 + (currentPage - 1) * itemsPerPage}
//                 </th>
//                 <td className="px-6 py-4">
//                   <img
//                     src={pokemon.image}
//                     alt={pokemon.name}
//                     className="w-16 h-16 object-cover rounded-full"
//                   />
//                 </td>
//                 <td className="px-6 py-4">{pokemon.name}</td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleLikeToggle(pokemon.id)}
//                     className={`px-4 py-2 rounded-lg text-white ${
//                       likedPokemons.has(pokemon.id)
//                         ? "bg-red-500"
//                         : "bg-blue-500"
//                     } hover:bg-opacity-80`}
//                   >
//                     {likedPokemons.has(pokemon.id) ? "Unlike" : "Like"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center gap-3 mt-6">
//         {[...Array(Math.ceil(pokemons.length / itemsPerPage))].map(
//           (_, index) => (
//             <button
//               key={index}
//               onClick={() => paginate(index + 1)}
//               className={`px-6 py-3 rounded-lg text-lg font-medium ${
//                 currentPage === index + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               } transition-colors hover:bg-blue-500`}
//             >
//               {index + 1}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
