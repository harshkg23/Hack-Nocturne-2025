# 🚀 Unified Developer Trend Radar (DevTrend AI)

DevTrend AI is an AI-powered platform that aggregates and analyzes real-time developer discussions from multiple communities. By unifying data from platforms like Reddit, Twitter, Discord, Slack, LinkedIn, and GitHub, DevTrend AI provides Developer Relations (DevRel) teams with deep insights into trending topics, developer pain points, and community sentiment. This allows DevRels to act faster, engage more effectively, and reduce redundant efforts.

---

## 🔹 Features

- **Cross-Platform Trend Aggregation**: Collects and compares developer discussions from multiple platforms (Reddit, Twitter, Discord, Slack, LinkedIn, GitHub).
- **AI-Powered Sentiment & Trend Analysis**: Detects trending topics, developer pain points, and positive discussions. Classifies them based on sentiment.
- **Intelligent Response Suggestions**: AI suggests pre-written responses to questions asked multiple times across platforms.
- **Cross-Platform Q&A Insights**: Unifies developer questions and responses, reducing duplication of effort.
- **Hidden Connections Detection**: Discovers hidden links between discussions on different platforms (e.g., a GitHub issue related to a Discord conversation).
- **Real-Time Visual Dashboard**: A heatmap of trending topics and engagement levels across platforms. Custom alerts for trending issues.
  
---

## 🔹 How It Works

### 1️⃣ **Data Aggregation**

DevTrend AI scrapes data from multiple developer platforms and normalizes it for analysis:
- **Platforms Scraped**: Reddit, Twitter, Discord, Slack, LinkedIn, GitHub Issues/PRs.
- **NLP Filtering**: Extracts developer-specific keywords and phrases.
- **Data Normalization**: Converts diverse data formats into a unified knowledge graph for analysis.

### 2️⃣ **AI-Powered Trend & Sentiment Analysis**

- **Trending Topics Detection**: AI analyzes and cross-references discussions across platforms to identify emerging trends.
- **Sentiment Classification**: Identifies whether a topic is generating positive or negative sentiment within the developer community.
- **Example**: Classifies a topic like “Rust compile times” as a pain point while identifying “TypeScript adoption” as a positive trend.

### 3️⃣ **Intelligent Response Suggestions**

- **Pre-Written Responses**: If the same question appears across multiple platforms, the AI suggests a pre-written response to save time.
- **Redundant Concerns**: AI flags repeated concerns (e.g., “OAuth confusion” trending on both Reddit and Discord) to allow DevRels to act quickly.

### 4️⃣ **Visual Dashboard & Alerts**

- **Cross-Platform Trends**: Displays a consolidated view of trends and engagement across platforms.
- **Heatmap**: Shows which communities are most engaged with particular topics.
- **Custom Alerts**: Notifications for emerging issues (e.g., "A major issue with your API is trending on both Twitter and Discord — time to respond!").

---

## 🔹 Why DevTrend AI is a Game-Changer?

- **Cross-Platform Analysis**: No other tool offers a true cross-platform analysis specifically for DevRel teams.
- **Efficiency Boost**: Reduces duplicated effort and helps DevRels respond faster to emerging pain points.
- **Uncover Hidden Insights**: Connects developer discussions across platforms, revealing insights that might otherwise go unnoticed.
- **Increased Engagement**: Enables DevRels to act in the right context, at the right time, to increase developer engagement.

---

## 🔹 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud)
- **Python** (for ML models)
- **Docker** (optional, for containerization)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/devtrend-ai.git
cd devtrend-ai


### 2️⃣ Backend Setup
```bash
cd server
npm install
```
#### Configure Environment Variables (`.env` file)
Create a `.env` file inside the **server** directory and add:
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_newsapi_key
```
#### Start the Backend Server
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd client
npm install
```
#### Start the React App
```bash
npm run dev
```

## API Routes
| Method | Route             | Description              |
|--------|------------------|--------------------------|
| POST   | `/api/auth/signup` | Register a new user     |
| POST   | `/api/auth/login`  | Login and get JWT       |
| GET    | `/api/news`        | Fetch technical news    |
| GET    | `/api/trends`      | Get trending topics     |

## Protected Routes
The `/dashboard` and other private routes are **protected**. If a user is not authenticated, they are redirected to `/login`.

## Contribution
Feel free to fork and contribute! Create a pull request with your improvements.

## License
This project is licensed under the **MIT License**.

---
🚀 Built with ❤️ using MERN Stack!

