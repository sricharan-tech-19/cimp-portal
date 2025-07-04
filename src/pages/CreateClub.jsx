import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateClub() {
  const [form, setForm] = useState({
    name: "",
    category: "Technical",
    description: "",
    presidentName: "",
    presidentReg: "",
    presidentDept: "BCE",
    presidentYear: "1",
    faculty: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Club:", form);
    alert("✅ Club Created!");
    setForm({
      name: "",
      category: "Technical",
      description: "",
      presidentName: "",
      presidentReg: "",
      presidentDept: "BCE",
      presidentYear: "1",
      faculty: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8ebf6] to-[#d7d9ec] flex items-center justify-center px-4 relative">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center text-[#373f6e] mb-6">
          Create a New Club
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold text-gray-700">Club Name</label>
            <input
              name="name"
              placeholder="e.g. CodeCrafters"
              value={form.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-input"
            >
              <option>Technical</option>
              <option>Cultural</option>
              <option>Literary</option>
              <option>Sports</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              placeholder="Brief about the club..."
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="form-input"
            />
          </div>

          {/* President Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700">President Name</label>
              <input
                name="presidentName"
                placeholder="Rahul Sharma"
                value={form.presidentName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Reg. Number</label>
              <input
                name="presidentReg"
                placeholder="20BCE1001"
                value={form.presidentReg}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Department</label>
              <select
                name="presidentDept"
                value={form.presidentDept}
                onChange={handleChange}
                className="form-input"
              >
                <option value="BCE">BCE - Computer Science and Engineering</option>
                <option value="ECM">ECM - Electronics and Computer Engineering</option>
                <option value="ECE">ECE - Electronics and Communication Engineering</option>
                <option value="BAI">BAI - CSE(AI & ML)</option>
                <option value="BRS">BRS - CSE(AI & Robo)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-gray-700">Year</label>
              <select
                name="presidentYear"
                value={form.presidentYear}
                onChange={handleChange}
                className="form-input"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          {/* Faculty */}
          <div>
            <label className="font-semibold text-gray-700">Faculty Coordinator</label>
            <input
              name="faculty"
              placeholder="Dr. Rajesh Kumar"
              value={form.faculty}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#373f6e] hover:bg-[#2f365c] text-white font-bold py-2 rounded-lg shadow transition active:scale-95"
          >
            ➕ Create Club
          </button>
        </form>

        <div className="bg-[#f4f4fb] p-4 rounded-lg shadow-inner mt-6 text-sm text-gray-700">
          <p>
            <span className="text-[#373f6e] font-semibold">Note:</span> Each club can have only one President and Faculty Coordinator. Make sure to double-check details!
          </p>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          By creating a club, you agree to the{" "}
          <span className="text-[#373f6e] font-semibold">community guidelines</span>.
        </p>
      </div>

      <Link
        to="/dashboard"
        className="absolute top-4 right-4 bg-[#373f6e] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#2f365c] transition font-bold"
      >
        ← Dashboard
      </Link>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #b6bce0;
          border-radius: 0.5rem;
          background-color: white;
          transition: box-shadow 0.2s ease-in-out;
        }
        .form-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(55, 63, 110, 0.3);
        }
      `}</style>
    </div>
  );
}
