# 🚀 TickerPulse

TickerPulse is a blazing‑fast React + Vite app that lets you search for stock tickers and see the latest company news—all powered by Finnhub’s free API. Get live autocomplete suggestions and company‑specific headlines (last 7 days) in a sleek, responsive UI! 🎉

Note: This was created for educational purposes only.
---

## ✨ Features

- **🔍 Live Autocomplete**  
  Type a company name or symbol and see up to 10 matching U.S. tickers in real time (powered by Finnhub’s `/search`).

- **📰 Company News Feed**  
  Select a ticker to fetch the last 7 days of headlines via Finnhub’s `/company-news`—complete with source, summary, image, and link.

- **🌙 Dark/Light Theme Toggle**  
  Switch between light and dark modes! Your preference is saved in `localStorage`.

- **📱 Responsive Design**  
  Built with Tailwind CSS for a mobile‑first experience. Works beautifully on any screen size.

---

## 🚀 Getting Started

1. **Clone the repo**
 
   ```git clone https://github.com/MoayyadShahid/tickerpulse.git```
   
   ```cd tickerpulse```

2. **Add your Finnhub API key**
   Create a file named .env at the project root with:
   
   ```VITE_FINNHUB_KEY=your_finnhub_api_key_here```

3. **Install dependencies & Run Locally**
   
   ```npm install```
   
   ```npm run dev```

