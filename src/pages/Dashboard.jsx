import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  const allClubs = [
    {
      name: "CodeCrafters",
      category: "Technical",
      president: { name: "Rahul Sharma", reg: "20BCE1001" },
      faculty: { name: "Dr. Rajesh Kumar", dept: "Computer Science" },
      members: 24,
    },
    {
      name: "Melody Makers",
      category: "Cultural",
      president: { name: "Priya Patel", reg: "20BCE1002" },
      faculty: { name: "Prof. Raman", dept: "Music & Arts" },
      members: 17,
    },
    {
      name: "VIT Champs",
      category: "Sports",
      president: { name: "Dev Singh", reg: "20BCE1003" },
      faculty: { name: "Prof. Thomas", dept: "Sports Science" },
      members: 30,
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredClubs = allClubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || club.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8ebf6] to-[#d7d9ec] flex items-center justify-center px-4 py-10 relative">
      

      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-8 relative">
        {/* Logout Button */}
        {/* VIT Logo Top-Left */}
      <img
        src="https://img.collegepravesh.com/2015/12/Vellore-Institute-of-Technology-Logo.png"
        alt="VIT Logo"
        className="absolute top-6 left-9 h-20 w-20 shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
      />
        <div className="absolute top-5 right-5">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
          >
            Logout
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-center text-[#373f6e] mb-10">
          CIMP Admin Dashboard
        </h1>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link to="/create-club" className="dashboard-btn">➕ Create Club</Link>
          <Link to="/manage-members" className="dashboard-btn">🧑‍🤝‍🧑 Manage Members</Link>
          <Link to="/assign-roles" className="dashboard-btn">🎓 Assign Roles</Link>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <div className="w-full">
            <label className="block mb-2 font-semibold text-gray-700">Search</label>
            <input
              type="text"
              placeholder="Search by club name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-[#373f6e]/50 rounded-lg focus:ring-2 focus:ring-[#373f6e] shadow-sm"
            />
          </div>
          <div className="w-full sm:w-60">
            <label className="block mb-2 font-semibold text-gray-700">Filter by Category</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#373f6e]/50 rounded-lg focus:ring-2 focus:ring-[#373f6e] shadow-sm"
            >
              <option value="All">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
        </div>

        {/* Club Table */}
        <div className="overflow-x-auto bg-[#f4f4fb] rounded-xl shadow-inner">
          <table className="min-w-full text-left">
            <thead className="bg-[#e0e0f0] text-[#373f6e] font-semibold">
              <tr>
                <th className="px-4 py-3">Club Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">President</th>
                <th className="px-4 py-3">Faculty Coordinator</th>
                <th className="px-4 py-3">Members</th>
              </tr>
            </thead>
            <tbody>
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-[#e8e8f8] transition duration-200"
                  >
                    <td className="px-4 py-3 font-medium">{club.name}</td>
                    <td className="px-4 py-3">{club.category}</td>
                    <td className="px-4 py-3">
                      {club.president.name}
                      <br />
                      <span className="text-xs text-gray-600">
                        {club.president.reg}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {club.faculty.name}
                      <br />
                      <span className="text-xs text-gray-600">
                        {club.faculty.dept}
                      </span>
                    </td>
                    <td className="px-4 py-3">{club.members}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-[#9ca3af]">
                    No clubs match your search/filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-500">
          Need help? Contact the{" "}
          <span className="text-[#373f6e] font-semibold">CIMP Admin Team</span>.
        </p>
      </div>

      {/* Tailwind Styling for Dashboard Buttons */}
      <style>{`
        .dashboard-btn {
          background-color: #373f6e;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          transition: transform 0.2s, background-color 0.2s;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .dashboard-btn:hover {
          background-color: #2f365c;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
