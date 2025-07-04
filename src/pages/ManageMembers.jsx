import { useState } from "react";
import { Link } from "react-router-dom";

export default function ManageMembers() {
  const [selectedClub, setSelectedClub] = useState("Code Club");

  const clubs = ["Code Club", "Music Club", "Sports Club"];

  const students = [
    { name: "Rahul Sharma", reg: "20BCE1001", dept: "BCE" },
    { name: "Priya Patel", reg: "20BCE1002", dept: "BCE" },
    { name: "Arjun Kumar", reg: "20ECE1003", dept: "ECE" },
    { name: "Sneha Reddy", reg: "20MEC1004", dept: "MEC" },
    { name: "Amit Verma", reg: "20ECM1005", dept: "ECM" },
    { name: "Tanya Joshi", reg: "20BAI1006", dept: "BAI" }
  ];

  const initialMembers = {
    "Code Club": [students[0], students[2]],
    "Music Club": [students[3]],
    "Sports Club": [students[4], students[5]]
  };

  const [members, setMembers] = useState(initialMembers);
  const [newMemberReg, setNewMemberReg] = useState("");

  const handleAdd = () => {
    if (!newMemberReg) return;
    const newStudent = students.find((s) => s.reg === newMemberReg);
    const alreadyMember = members[selectedClub].some((m) => m.reg === newMemberReg);

    if (newStudent && !alreadyMember) {
      setMembers({
        ...members,
        [selectedClub]: [...members[selectedClub], newStudent]
      });
    }

    setNewMemberReg("");
  };

  const handleRemove = (reg) => {
    setMembers({
      ...members,
      [selectedClub]: members[selectedClub].filter((m) => m.reg !== reg)
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8ebf6] to-[#d7d9ec] px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 relative">
        <h1 className="text-3xl font-extrabold text-[#373f6e] text-center mb-8">
          Manage Members
        </h1>

        {/* Select Club */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">Select Club</label>
          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="w-full p-2 border border-[#b6bce0] rounded focus:outline-none focus:ring-2 focus:ring-[#373f6e] transition"
          >
            {clubs.map((club, i) => (
              <option key={i} value={club}>
                {club}
              </option>
            ))}
          </select>
        </div>

        {/* Add Member */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">Add Member</label>
          <div className="flex gap-2">
            <select
              value={newMemberReg}
              onChange={(e) => setNewMemberReg(e.target.value)}
              className="w-full p-2 border border-[#b6bce0] rounded focus:outline-none focus:ring-2 focus:ring-[#373f6e]"
            >
              <option value="">Select a student</option>
              {students.map((s, i) => (
                <option key={i} value={s.reg}>
                  {s.name} ({s.reg}) - {s.dept}
                </option>
              ))}
            </select>
            <button
              onClick={handleAdd}
              className="bg-[#373f6e] hover:bg-[#2f365c] text-white px-4 py-2 rounded-lg font-bold shadow transition"
            >
              ➕ Add
            </button>
          </div>
        </div>

        {/* Member List */}
        <h2 className="text-xl font-semibold text-[#373f6e] mb-3 text-center">
          Members of {selectedClub}
        </h2>
        <div className="bg-[#f4f4fb] p-4 rounded-lg shadow-inner mb-6 max-h-64 overflow-y-auto">
          {members[selectedClub].length > 0 ? (
            <ul className="space-y-2">
              {members[selectedClub].map((member, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span className="text-gray-800">
                    {member.name} ({member.reg}) - {member.dept}
                  </span>
                  <button
                    onClick={() => handleRemove(member.reg)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic text-center">No members yet.</p>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center">
          Only unique students can be added per club.
        </p>

        {/* Back Button */}
        <Link
          to="/dashboard"
          className="absolute top-4 right-4 bg-[#373f6e] hover:bg-[#2f365c] text-white font-bold px-4 py-2 rounded-full shadow transition"
        >
          ← Dashboard
        </Link>
      </div>
    </div>
  );
}
