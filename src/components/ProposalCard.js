import { useState } from "react";
import { updateProposalStatus, addComment } from "../services/api";

const ProposalCard = ({ proposal, token }) => {
  const [status, setStatus] = useState(proposal.status);
  const [comment, setComment] = useState("");

  const handleStatusChange = async (newStatus) => {
    try {
      await updateProposalStatus(proposal._id, newStatus, token);
      setStatus(newStatus);
      alert("Status updated!");
    } catch (err) {
      alert("Error updating status.");
    }
  };

  const handleAddComment = async () => {
    try {
      await addComment(proposal._id, comment, token);
      alert("Comment added!");
      setComment("");
    } catch (err) {
      alert("Error adding comment.");
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold">{proposal.title}</h2>
      <p className="text-gray-600">{proposal.description}</p>
      <p className="mt-2 font-semibold">
        Funding Goal: ${proposal.fundingGoal}
      </p>
      <p className="mt-2 text-sm text-gray-500">Status: {status}</p>

      <div className="mt-2">
        <button
          onClick={() => handleStatusChange("Under Review")}
          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
        >
          Under Review
        </button>
        <button
          onClick={() => handleStatusChange("Negotiating")}
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        >
          Negotiating
        </button>
        <button
          onClick={() => handleStatusChange("Funded")}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Funded
        </button>
      </div>

      <div className="mt-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="bg-gray-800 text-white px-4 py-2 mt-2"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default ProposalCard;
