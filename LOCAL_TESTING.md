# 🚀 Local Testing Instructions

Because this project uses absolute paths (like `/shinertech/assets/...`), you **cannot** just open the HTML files directly in your browser. You must run a local server from the **parent directory**.

## 🛠️ How to Run the Local Server

1. **Open PowerShell** or your terminal.
2. **Go to the parent directory** (one level up from the repo):
   ```powershell
   cd "C:\Users\ReidSutton\Documents\Shiner Tech"
   ```
3. **Start the Python server**:
   ```powershell
   python -m http.server 8000
   ```
   *(If `python` doesn't work, try `py -m http.server 8000`)*

## 🌐 How to View the Site

Once the server is running, open your browser to:
👉 **[http://localhost:8000/shinertech/index.htm](http://localhost:8000/shinertech/index.htm)**

---
> [!IMPORTANT]
> **Why the parent directory?** Running from the parent directory makes the URL path `/shinertech/` match your local folder name. This keeps all your CSS and images working perfectly without changing any code!
