# Google Sheets Integration Setup Guide

This guide will help you connect the waitlist form to Google Sheets.

## Option 1: Google Apps Script (Recommended - Easiest)

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name the first column "Email" (A1) and second column "Date" (B1) if needed

### Step 2: Create Google Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = new Date();
    
    // Append email and timestamp to the sheet
    sheet.appendRow([email, timestamp]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾 icon) and give it a name like "Waitlist Handler"
4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
6. Set:
   - Description: "Waitlist API"
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**
8. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/...`)

### Step 3: Add Environment Variable
1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add:
```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```
3. Replace `YOUR_SCRIPT_ID` with the URL you copied from Step 2
4. Restart your Next.js development server

### Step 4: Test
1. Submit an email through the waitlist form
2. Check your Google Sheet - the email should appear automatically!

---

## Comparison: Option 1 vs Option 2

### **Option 1: Google Apps Script**

**Reliability: ⭐⭐⭐⭐ (4/5)**
- ✅ Very reliable for low to medium traffic (< 1000 submissions/day)
- ⚠️ Can hit quotas under heavy load
- ✅ Google manages infrastructure and uptime
- ⚠️ Single point of failure (your script)

**Efficiency: ⭐⭐⭐ (3/5)**
- ⚠️ Slightly slower (~500-1000ms per request) due to Apps Script execution time
- ✅ No credentials to manage in your codebase
- ✅ Simple HTTP request, no complex auth flows

**Real-time: ✅ YES**
- ✅ Data appears in Google Sheets within 1-2 seconds
- ✅ True real-time updates (not batched)

**Quotas & Limits:**
- Free tier: **20,000 requests/day**
- Max execution time: **6 minutes** (not relevant for this use case)
- Concurrent executions: **30** per user

**Points of Failure:**
1. **Apps Script quota exceeded** - If you exceed 20k requests/day
2. **Script deployment changes** - If you redeploy, old URL becomes invalid
3. **Google service outage** - Rare but possible
4. **Script execution timeout** - Unlikely for simple append operations
5. **Network issues** - Between your server and Google

**Best for:** Small to medium traffic, quick setup, low maintenance

---

### **Option 2: Google Sheets API (Service Account)**

**Reliability: ⭐⭐⭐⭐⭐ (5/5)**
- ✅ Highly reliable, production-grade
- ✅ No quota limits for reasonable usage (up to millions of requests)
- ✅ Enterprise-grade infrastructure
- ✅ Better error handling and retry mechanisms

**Efficiency: ⭐⭐⭐⭐⭐ (5/5)**
- ✅ Faster response times (~200-400ms per request)
- ✅ Direct API calls, no intermediate script execution
- ✅ Better for high-volume traffic
- ⚠️ Requires credentials management (service account keys)

**Real-time: ✅ YES**
- ✅ Data appears in Google Sheets immediately (< 500ms)
- ✅ True real-time updates, same as Option 1

**Quotas & Limits:**
- **1,000 requests per 100 seconds per user** (per API key)
- **500 requests per 100 seconds per project** (can request increase)
- Much higher overall limits than Apps Script

**Points of Failure:**
1. **Service account key exposure** - Security risk if leaked
2. **Permission issues** - Sheet must be shared with service account
3. **JWT token generation errors** - If private key is invalid
4. **API quota exceeded** - Only under very high load
5. **Network issues** - Between your server and Google API

**Best for:** Production apps, high traffic, enterprise use, maximum reliability

---

## **Recommendation**

- **Start with Option 1** if you expect < 1,000 signups/day (simple, reliable enough)
- **Use Option 2** if you expect > 1,000 signups/day or need enterprise reliability
- **Both are real-time** - data appears immediately in Sheets

**Real-time Performance:**
- Both options provide **true real-time** data (within 1-2 seconds)
- Option 2 is slightly faster but the difference is negligible for waitlist use cases
- Data appears immediately visible in your Google Sheet with both approaches

---

## Option 2: Google Sheets API (Advanced - More Reliable)

### Step 1: Install Required Package
```bash
npm install jsonwebtoken @types/jsonwebtoken
```

### Step 2: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google Sheets API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google Sheets API"
   - Click **Enable**

### Step 3: Create Service Account
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in service account name (e.g., "waitlist-service")
4. Click **Create and Continue**
5. Skip optional steps and click **Done**

### Step 4: Create and Download Key
1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Download the JSON file

### Step 5: Share Google Sheet
1. Open your Google Sheet
2. Click **Share** button
3. Add the service account email (found in the JSON file, looks like `xxx@xxx.iam.gserviceaccount.com`)
4. Give it **Editor** permission
5. Click **Done**

### Step 6: Extract Credentials
From the downloaded JSON file, you'll need:
- `client_email` → This is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → This is your `GOOGLE_PRIVATE_KEY`
- Get your `SPREADSHEET_ID` from the Google Sheet URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

### Step 7: Add Environment Variables
Add to `.env.local`:
```bash
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...your key here...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_RANGE=Sheet1!A:B  # Optional: defaults to Sheet1!A:B
```

**Important:** 
- Keep the quotes around `GOOGLE_PRIVATE_KEY`
- Keep the `\n` characters in the private key (they're needed)
- Don't commit `.env.local` to git!

### Step 8: Test
Restart your Next.js server and test the waitlist form.

---

## Troubleshooting

- **"Server configuration error"**: Make sure `GOOGLE_APPS_SCRIPT_URL` is set in `.env.local`
- **"Failed to save email"**: Check that your Google Apps Script deployment is set to "Anyone" access
- **Emails not appearing**: Verify the script has permission to edit the sheet

For more help, check the Google Apps Script documentation: https://developers.google.com/apps-script
