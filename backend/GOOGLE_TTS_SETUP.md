# Google Cloud Text-to-Speech Setup Guide (Windows)

This document provides step-by-step instructions for configuring the official **Google Cloud Text-to-Speech API** in JanSahay AI on Windows.

---

## Supported Authentication Approaches

You can authenticate using **either** of the following two methods:

### Method A: Service Account JSON (Recommended — No gcloud CLI Required)
Ideal for developers who do not have the `gcloud` CLI installed or who prefer a direct project key file.

### Method B: Google Cloud CLI Application Default Credentials (ADC)
Ideal for developers who already have Google Cloud SDK (`gcloud`) installed on Windows.

---

## Step-by-Step Setup Instructions (Method A: Service Account JSON)

### 1. Create or Select a Google Cloud Project
1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown at the top of the page and select **New Project**.
3. Name your project (e.g., `jansahay-ai-voice`) and click **Create**.
4. Ensure your new project is selected in the console header.

### 2. Enable Billing
Google Cloud Text-to-Speech requires an active billing account linked to the project.
1. Navigate to **Billing** in the Google Cloud Console navigation menu.
2. Link your project to an existing billing account (or activate the Google Cloud Free Tier / 90-day trial with $300 credits).
   > **Note:** Google Cloud TTS includes a generous free tier every month (up to 4 million characters free for Standard voices, and up to 1 million characters free for Neural2/WaveNet voices per month).

### 3. Enable the Cloud Text-to-Speech API
1. Navigate to **APIs & Services > Library** or visit the [Cloud Text-to-Speech API Page](https://console.cloud.google.com/apis/library/texttospeech.googleapis.com).
2. Click **Enable**.

### 4. Create a Service Account
1. Navigate to **IAM & Admin > Service Accounts** in the Google Cloud Console.
2. Click **+ Create Service Account** at the top.
3. Fill in the details:
   - **Service account name:** `jansahay-tts-service`
   - **Service account ID:** `jansahay-tts-service` (automatically filled)
   - **Description:** `Service account for JanSahay AI multilingual voice assistant`
4. Click **Create and Continue**.

### 5. Grant Required Permissions
1. In the **Grant this service account access to project** step:
   - Under **Role**, search for and select: **Cloud Text-to-Speech API User** (`roles/texttospeech.user`).
   - *(Principle of Least Privilege: Do NOT grant Owner or Editor roles).*
2. Click **Continue**, then click **Done**.

### 6. Create and Download JSON Key File
1. In the Service Accounts list, click on the newly created service account (`jansahay-tts-service@...`).
2. Go to the **Keys** tab at the top.
3. Click **Add Key > Create new key**.
4. Select **JSON** as the key type and click **Create**.
5. The JSON key file will be automatically downloaded to your computer (e.g., `Downloads\jansahay-ai-voice-xxxxx.json`).

### 7. Secure Your JSON Key File on Windows
1. Move the downloaded JSON file to a secure directory outside the git repository or inside a protected keys folder, for example:
   ```text
   C:\Users\<YourUser>\keys\jansahay-tts-key.json
   ```
2. **SECURITY WARNING:** Never commit this JSON file to GitHub or version control. JanSahay AI's `.gitignore` already ignores `*service-account*.json` and `*credentials*.json`.

### 8. Configure Environment Variables
Open `backend/.env` (create it from `backend/.env.example` if it doesn't exist) and set:
```env
# Enable Google Cloud TTS
GOOGLE_TTS_ENABLED=true

# Windows path to your service account key file
GOOGLE_APPLICATION_CREDENTIALS=C:\Users\<YourUser>\keys\jansahay-tts-key.json

# Indian Locale Voices
GOOGLE_TTS_EN_VOICE=en-IN-Neural2-A
GOOGLE_TTS_HI_VOICE=hi-IN-Neural2-A
GOOGLE_TTS_GU_VOICE=gu-IN-Wavenet-A

# Voice Audio Characteristics
GOOGLE_TTS_SPEAKING_RATE=0.95
GOOGLE_TTS_PITCH=0
```

---

## Alternative: Method B (Application Default Credentials using gcloud)

If you have the `gcloud` CLI installed:
1. Open PowerShell and run:
   ```powershell
   gcloud auth application-default login
   ```
2. A browser window will open. Log into your Google Cloud account and click **Allow**.
3. Set your active project:
   ```powershell
   gcloud config set project YOUR_PROJECT_ID
   ```
4. In `backend/.env`, you can leave `GOOGLE_APPLICATION_CREDENTIALS` blank; the Google Cloud client library will automatically use ADC stored in `%APPDATA%\gcloud\application_default_credentials.json`.

---

## 9. Install Backend Dependencies
If not already installed, run PowerShell from the `backend` folder:
```powershell
cd backend
npm install
```

---

## 10. Start the Backend Server
```powershell
node server.js
```
The server will start on port `5000` (http://localhost:5000).

---

## 11. Verify TTS Health Check
Open your browser or PowerShell and test the health endpoint:
```powershell
curl http://localhost:5000/api/tts/health
```
Expected JSON response:
```json
{
  "success": true,
  "status": "HEALTHY",
  "enabled": true,
  "provider": "Google Cloud Text-to-Speech",
  "languages": ["en", "hi", "gu"],
  "supportedLocales": ["en-IN", "hi-IN", "gu-IN"],
  "credentialsConfigured": true,
  "credentialsSource": "GOOGLE_APPLICATION_CREDENTIALS",
  "voices": {
    "english": "en-IN-Neural2-A",
    "hindi": "hi-IN-Neural2-A",
    "gujarati": "gu-IN-Wavenet-A"
  }
}
```

---

## 12. Run the Command-Line TTS Test Script
Verify audio synthesis for English, Hindi, and Gujarati without needing the frontend:
```powershell
node backend/test_tts_google.js
```
This script synthesizes test phrases and generates 3 audio files in `backend/`:
- `test-output-en.mp3` (English `en-IN-Neural2-A`)
- `test-output-hi.mp3` (Hindi `hi-IN-Neural2-A`)
- `test-output-gu.mp3` (Gujarati `gu-IN-Wavenet-A`)

---

## 13. Testing Voice Assistant via Browser
1. Open `http://localhost:5000` in your web browser.
2. Click the floating microphone button or open the voice modal.
3. **English Test:**
   - Speak: *"Tell me about government schemes for farmers."*
   - Verify English response and crisp audio pronunciation (`en-IN`).
4. **Hindi Test:**
   - Speak: *"मुझे किसानों के लिए सरकारी योजनाओं के बारे में बताइए।"*
   - Verify Hindi response in Devanagari and natural Hindi voice (`hi-IN`).
5. **Gujarati Test:**
   - Speak: *"મને ખેડૂતો માટે સરકારી યોજનાઓ વિશે માહિતી આપો."*
   - Verify Gujarati response in Gujarati script and authentic Gujarati voice (`gu-IN`).

---

## Troubleshooting & Common Errors

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| `CREDENTIALS_MISSING` / 503 | `GOOGLE_APPLICATION_CREDENTIALS` path is incorrect or file not found | Check that the path in `backend/.env` points to the valid JSON key file on Windows. Use absolute paths like `C:\keys\my-key.json`. |
| `PERMISSION_DENIED` | Service account lacks permissions or API disabled | Verify in Google Cloud Console that the **Cloud Text-to-Speech API** is enabled and the service account has the **Cloud Text-to-Speech API User** role. |
| `RESOURCE_EXHAUSTED` / 429 | Quota exceeded | Check billing status or quota usage on Google Cloud Console under Quotas & System Limits. |
| Browser Autoplay Blocked | Browser audio policy prevents autoplay | Click the **🔊 Listen** button on any message card to initiate audio playback with user interaction. |
