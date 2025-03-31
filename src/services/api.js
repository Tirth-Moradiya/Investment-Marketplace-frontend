import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Fetch all proposals
export const fetchProposals = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/proposals/list`, {
    headers: {
      Authorization: `Bearer ${token}`, // 🔥 Pass token here
      "Content-Type": "application/json",
    },
  });
};

// Submit a new proposal
export const createProposal = async (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/proposals/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update proposal status
export const updateProposalStatus = async (proposalId, status) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `${API_URL}/proposals/update-status/${proposalId}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Add comment (negotiation)
export const addComment = async (proposalId, comment) => {
  const token = localStorage.getItem("token");

  console.log("Token being sent:", token);
  return axios.post(
    `${API_URL}/proposals/review/${proposalId}`,
    { comment },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
