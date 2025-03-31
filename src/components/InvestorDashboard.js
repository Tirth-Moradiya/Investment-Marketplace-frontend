import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust path based on your project structure
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InvestorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [investmentData, setInvestmentData] = useState([]);

  useEffect(() => {
    if (user?.role === "investor") {
      // Fetch investment data only if user is an investor
      const fetchData = async () => {
        const response = await fetch("http://localhost:5000/api/investments");
        const data = await response.json();
        setInvestmentData(data);
      };

      fetchData();
    }
  }, [user]);

  // Hide dashboard if user is not an investor
  if (!user || user.role !== "investor") {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Investor Dashboard
      </h2>

      {/* Total Investments */}
      <div className="text-lg font-semibold mb-4">
        Total Investments: ₹
        {investmentData.reduce((sum, item) => sum + item.amount, 0)}
      </div>

      {/* Investment Trends Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={investmentData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InvestorDashboard;
