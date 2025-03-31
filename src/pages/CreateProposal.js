import { useState } from "react";
import { createProposal } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateProposal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProposal({ title, description, fundingGoal });
      alert("Proposal submitted successfully!");
      navigate("/proposals");
    } catch (err) {
      console.log("error::", err);
      alert("Error submitting proposal.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create Investment Proposal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Proposal Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter proposal title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your investment idea..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Funding Goal ($)
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter funding goal"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white text-lg font-medium p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProposal;
