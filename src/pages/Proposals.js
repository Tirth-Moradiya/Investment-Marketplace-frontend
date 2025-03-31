import { useEffect, useState } from "react";
import { fetchProposals } from "../services/api";
import ProposalCard from "../components/ProposalCard";

const Proposals = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals()
      .then((res) => {
        console.log("API Response:", res.data); // ✅ Debugging log
        setProposals(res.data.proposals || []); // ✅ Extract the array
      })
      .catch((error) => {
        console.error("Error fetching proposals:", error);
        setProposals([]); // ✅ Prevent crash
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Investment Proposals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proposals.length > 0 ? (
          proposals.map((proposal) => (
            <ProposalCard key={proposal._id} proposal={proposal} />
          ))
        ) : (
          <p>No proposals available</p> // ✅ Handle empty state
        )}
      </div>
    </div>
  );
};

export default Proposals;
