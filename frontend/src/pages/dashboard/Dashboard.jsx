import React, { useState, useEffect } from "react";
import {
  Building2,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Trophy,
  AlertTriangle,
  Newspaper,
  UserCircle2,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

console.log("GEMINI_API_KEY:", import.meta.env.VITE_GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeTab, setActiveTab] = useState("pricing");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const companies = [
    { id: 1, name: "OpenAI" },
    { id: 2, name: "Apple" },
    { id: 3, name: "Stripe" },
  ];

  const tabs = [
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "existing-features", label: "Existing Features", icon: Lightbulb },
    {
      id: "new-features",
      label: "New Features Requested",
      icon: MessageSquare,
    },
    { id: "competition", label: "Competition", icon: Trophy },
    { id: "complaints", label: "Complaints", icon: AlertTriangle },
  ];

  const generateAIInsights = async (tab) => {
    setIsLoading(true);
    setApiResponse("");
    const companyName =
      companies.find((c) => c.id === selectedCompany)?.name || "industry";

    let prompt = `Analyze the ${companyName} industry and provide insights.`;

    if (tab === "pricing") {
      prompt = `
    Imagine you have access to extensive social media data from platforms like Twitter and Reddit. 
    Analyze developer sentiment and competitor pricing strategies in the API market for ${companyName}.  

    Please ensure the response follows this structure:  
    - Provide a concise summary.  
    - Use numbered lists and bullet points for clarity.  
    - Avoid tables.  
    - Organize the output with clear headings.  
    - Ensure consistent and visually appealing formatting.  

    PRICING ANALYSIS:  
    1. Summary of Developer Sentiment:  
       - Common opinions on pricing (e.g., "too expensive," "great value," "flexible plans").  
    2. Competitor Comparison:  
       - Compare ${companyName}'s pricing to competitors (e.g., Competitor X offers a free tier, Competitor Y has a premium model).  
    3. Key Challenges & Suggestions:  
       - Highlight pricing challenges developers face and suggest improvements.  
    4. Sentiment Statistics:  
       - Positive: 45%  
       - Neutral: 35%  
       - Negative: 20%  
    5. Recommendations:  
       - Summarize potential pricing improvements.  
  `;
    } else if (tab === "existing-features") {
      prompt = `
    Imagine you have access to extensive social media data, customer feedback, and developer insights. Analyze the current features of ${companyName} based on this hypothetical data.  

    Please ensure the response follows this structure:  
    - Use numbered lists and bullet points.  
    - Avoid tables.  
    - Maintain a consistent and visually appealing format.  

    EXISTING FEATURES ANALYSIS:  
    1. Most Used & Appreciated Features:  
       - List features with brief descriptions of strengths.  
    2. Areas for Improvement:  
       - Mention common feedback on existing features (e.g., "Feature X lacks customization").  
    3. Sentiment Analysis:  
       - Positive: 60%  
       - Neutral: 30%  
       - Negative: 10%  
    4. Enhancement Suggestions:  
       - Recommend improvements for underutilized features.  
    5. Strategic Insights:  
       - Summarize ways to keep existing features competitive.  
  `;
    } else if (tab === "new-features") {
      prompt = `
    Imagine you have access to extensive social media data from platforms like Twitter and Reddit, as well as direct feedback from developers. Analyze feature requests, prioritize demands, and provide insights for ${companyName}.  

    Please ensure the response follows this structure:  
    - Use numbered lists and bullet points.  
    - Avoid tables.  
    - Maintain a consistent and visually appealing format.  

    NEW FEATURE DEMANDS:  
    1. Top Requested Features:  
       - Summarize popular requests (e.g., "Add Python SDK support").  
    2. Clustering & Prioritization:  
       - Group feature requests based on themes (e.g., performance, integrations).  
    3. Demand & Urgency:  
       - Rank requests based on frequency, sentiment, and alignment with roadmap.  
    4. Recommendations:  
       - Provide actionable suggestions for top-priority features.  
    5. Issue/Ticket Simulation:  
       - List auto-generated GitHub Issues or Jira tickets with clear titles.  
  `;
    } else if (tab === "competition") {
      prompt = `
    Imagine you have access to extensive social media data from platforms like Twitter and Reddit, along with real-time competitor analysis. Generate insights on ${companyName}'s competitive landscape.  

    Please ensure the response follows this structure:  
    - Use numbered lists and bullet points.  
    - Avoid tables.  
    - Maintain a consistent and visually appealing format.  

    COMPETITIVE ANALYSIS:  
    1. Key Competitors:  
       - Summarize competitors' strengths and weaknesses.  
    2. Sentiment Trends:  
       - Compare sentiment trends for competitors.  
    3. Competitive Battle Card:  
       - Provide a comparative analysis of features, pricing, and support.  
    4. Strategic Recommendations:  
       - Suggest strategies to maintain a competitive edge.  
    5. Visual Insights:  
       - Summarize sentiment trends, frequency of mentions, and industry trends.  
  `;
    } else if (tab === "complaints") {
      prompt = `
    Imagine you have access to extensive social media data, developer feedback, and support ticket analysis. Provide insights into customer complaints and issues faced by ${companyName}.  

    Please ensure the response follows this structure:  
    - Use numbered lists and bullet points.  
    - Avoid tables.  
    - Maintain a consistent and visually appealing format.  

    COMPLAINT ANALYSIS:  
    1. Common Complaints:  
       - Categorize complaints (e.g., "Bug," "Billing Issue," "Feature Request").  
    2. Sentiment Analysis:  
       - Positive: 30%  
       - Neutral: 40%  
       - Negative: 30%  
    3. AI-Powered Solutions:  
       - Describe auto-categorization and solution suggestions.  
    4. Escalation Workflow:  
       - Outline escalation process for critical issues.  
    5. Actionable Insights:  
       - Suggest ways to reduce complaints and enhance user satisfaction.  
  `;
    }


    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const cleanedText = text.replace(/[*#]/g, "").trim();
      setApiResponse(cleanedText);
    } catch (error) {
      console.error("Error generating AI insights:", error);
      setApiResponse("Failed to generate insights.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCompany !== null && activeTab) {
      generateAIInsights(activeTab);
    }
  }, [selectedCompany, activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTechNewsClick = () => {
    navigate("/news"); // ✅ Navigate to /news route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-500">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-blue-500">AI DevRel</h1>
          </div>

          {/* Dropdown and Button */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300
                hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 appearance-none"
                value={selectedCompany || ""}
                onChange={(e) => setSelectedCompany(Number(e.target.value))}
              >
                <option value="" disabled>
                  Select Company
                </option>
                {companies.map((company) => (
                  <option
                    key={company.id}
                    value={company.id}
                    className="text-black bg-white hover:bg-gray-200"
                  >
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleTechNewsClick}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <Newspaper className="h-5 w-5" />
              <span>Tech News</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {selectedCompany ? (
        <main className="max-w-6xl mx-auto p-6 space-y-8 min-h-[70vh] flex flex-col">
          {/* Tabs */}
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 px-5 py-2 rounded-full cursor-pointer
                  ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300"
                  }
                `}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            className={`transition-all duration-700 ease-in-out transform ${
              isLoading ? "opacity-50 scale-95" : "opacity-100 scale-100"
            } flex-grow flex items-center justify-center`}
          >
            {isLoading ? (
              <div className="text-gray-400 text-lg animate-pulse">
                Fetching insights...
              </div>
            ) : (
              apiResponse && (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 w-[90%] h-[60vh] overflow-y-scroll">
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">
                    AI Insights
                  </h3>
                  <pre className="text-gray-300 text-base leading-6 tracking-wide whitespace-pre-wrap">
                    {apiResponse}
                  </pre>
                </div>
              )
            )}
          </div>
        </main>
      ) : (
        <div className="max-w-5xl mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh] text-gray-300">
          <UserCircle2 className="h-24 w-24 text-blue-500 mb-4 animate-pulse" />
          <h2 className="mt-2 text-2xl font-semibold text-gray-200">
            Select a company to view insights
          </h2>
          <p className="text-gray-400 mt-2">
            Use the dropdown above to get insights on pricing, features, and
            more!
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
