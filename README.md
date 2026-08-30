# JanSahay AI 🤖🇮🇳

**JanSahay AI** is an AI-powered government scheme recommendation platform that helps citizens discover government schemes they are eligible for based on their personal information.

## 🎯 Problem Statement

India has numerous government schemes designed to support students, farmers, women, senior citizens, unemployed individuals, small businesses, and economically weaker sections. However, many eligible citizens fail to benefit from these schemes because information is scattered across different government portals, eligibility criteria can be difficult to understand, and people often do not know which schemes are relevant to their situation.

## 💡 Our Solution

We developed an intelligent system that simplifies this process by automatically identifying and explaining the government schemes a citizen may be eligible for based on their personal profile.

The user provides basic details such as location, age, income, occupation, education, and other relevant information. The system analyzes the user’s profile against government scheme eligibility criteria and provides a personalized list of eligible Central and State Government schemes, along with the benefits, eligibility reasons, required documents, and official application links.

## ✨ Key Features

- **Personalized Recommendations:** Get a tailored list of eligible schemes based on your demographic profile.
- **AI-Powered Matching:** Intelligent algorithms match user data against thousands of central and state scheme requirements.
- **Multi-Step Form:** An easy-to-use, step-by-step form to collect user details (Age, Gender, Category, Income, Education, etc.).
- **Interactive AI Chatbot:** A built-in assistant to help users navigate schemes and ask questions.
- **Responsive Dashboard:** A beautiful, accessible UI inspired by the myScheme.gov.in portal, complete with Dark Mode support.
- **Comprehensive Scheme Data:** Categorized view of schemes (Agriculture, Education, Health, etc.) with real-time statistics.

## 🛠️ Technology Stack

This project is built using lightweight, vanilla web technologies for maximum speed and simplicity:
- **HTML5** for structure
- **CSS3** (Custom properties, Flexbox/Grid, Animations) for styling
- **JavaScript (ES6+)** for interactive logic, multi-step forms, and DOM manipulation
- **FontAwesome** for scalable icons

## 🚀 How to Run the Project

You do not need to install any heavy frameworks or node modules to run this frontend prototype.

### Method 1: The Easiest Way
1. Clone or download this repository.
2. Open the `JanSahayAI` folder.
3. Double-click the `index.html` file to open it directly in your web browser.

### Method 2: Using a Local Server (Recommended)
Running via a local server is recommended to prevent any strict CORS issues if you expand the project later.

1. Open your terminal in the project directory.
2. Run a simple static server using `npx`:
   ```bash
   npx serve .
   ```
3. Open your browser and navigate to `http://localhost:3000`.

*(Alternatively, you can use the "Live Server" extension in VS Code).*

## 📁 Project Structure

```
JanSahayAI/
│
├── index.html     # Main dashboard and application UI
├── style.css      # Design system, responsive layout, and animations
├── script.js      # Logic for the multi-step form, AI chat, and dynamic content
└── README.md      # Project documentation
```

---
*Built for the HackCoders Hackathon* ❤️
