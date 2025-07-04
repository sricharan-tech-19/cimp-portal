import { useState } from "react";
import { Link } from "react-router-dom";

export default function AssignRoles() {
  const clubs = ["CodeCrafters", "MusicVerse", "Sportify"];

  const students = [
    { name: "Rahul Sharma", reg: "20BCE1001", dept: "BCE" },
    { name: "Priya Patel", reg: "20BCE1002", dept: "BCE" },
    { name: "Arjun Kumar", reg: "20ECE1003", dept: "ECE" },
    { name: "Sneha Reddy", reg: "20MEC1004", dept: "MEC" }
  ];

  const faculty = [
    { name: "Dr. Rajesh Kumar", dept: "BCE", email: "rajesh.kumar@vit.ac.in" },
    { name: "Prof. Raman", dept: "ECE", email: "raman@vit.ac.in" },
    { name: "Prof. Thomas", dept: "MEC", email: "thomas@vit.ac.in" }
  ];

  const [selectedClub, setSelectedClub] = useState("CodeCrafters");

  const [roles, setRoles] = useState({
    CodeCrafters: { president: "", faculty: "" },
    MusicVerse: { president: "", faculty: "" },
    Sportify: { president: "", faculty: "" }
  });

  const updateRole = (type, value) => {
    setRoles({
      ...roles,
      [selectedClub]: {
        ...roles[selectedClub],
        [type]: value
      }
    });
  };

  const handleAssign = () => {
    alert("✅ Roles Assigned!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8ebf6] to-[#d7d9ec] flex items-center justify-center px-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-[#373f6e] mb-8 text-center">
          Assign Roles
        </h1>

        {/* Club selection */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Select Club:
          </label>
          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="w-full p-2 border border-[#b6bce0] rounded focus:ring-2 focus:ring-[#373f6e]"
          >
            {clubs.map((club, i) => (
              <option key={i} value={club}>
                {club}
              </option>
            ))}
          </select>
        </div>

        {/* President Selection */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            President (Student)
          </label>
          <select
            value={roles[selectedClub].president}
            onChange={(e) => updateRole("president", e.target.value)}
            className="w-full p-2 border border-[#b6bce0] rounded focus:ring-2 focus:ring-[#373f6e]"
          >
            <option value="">Select Student</option>
            {students.map((s, i) => (
              <option
                key={i}
                value={`${s.name} (${s.reg}) - ${s.dept}`}
              >
                {s.name} ({s.reg}) - {s.dept}
              </option>
            ))}
          </select>
        </div>

        {/* Faculty Coordinator */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Faculty Coordinator
          </label>
          <select
            value={roles[selectedClub].faculty}
            onChange={(e) => updateRole("faculty", e.target.value)}
            className="w-full p-2 border border-[#b6bce0] rounded focus:ring-2 focus:ring-[#373f6e]"
          >
            <option value="">Select Faculty</option>
            {faculty.map((f, i) => (
              <option
                key={i}
                value={`${f.name} - ${f.dept}`}
              >
                {f.name} - {f.dept}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAssign}
          className="w-full bg-[#373f6e] hover:bg-[#2f365c] text-white font-bold py-2 rounded-lg shadow transition mb-6"
        >
          Assign Roles
        </button>

        <div className="bg-[#f4f4fb] p-4 rounded-lg shadow-inner mb-4 text-sm">
          <p>
            <span className="font-semibold text-[#373f6e]">President:</span>{" "}
            {roles[selectedClub].president || <span className="text-gray-400">Not Assigned</span>}
          </p>
          <p>
            <span className="font-semibold text-[#373f6e]">Faculty:</span>{" "}
            {roles[selectedClub].faculty || <span className="text-gray-400">Not Assigned</span>}
          </p>
        </div>

        <div className="text-xs text-gray-500 text-center">
          One President and Faculty Coordinator per club only.
        </div>

        <Link
          to="/dashboard"
          className="absolute top-4 right-4 bg-[#373f6e] hover:bg-[#2f365c] text-white px-4 py-2 rounded-full shadow transition"
        >
          ← Dashboard
        </Link>
      </div>
    </div>
  );
}
