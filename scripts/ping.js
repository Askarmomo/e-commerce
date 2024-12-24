import https from "https"

// Add the URLs of your deployed frontend and backend
const urls = [
    "https://e-commerce-31ey.onrender.com/"
];

// Function to ping a URL
const ping = (url) => {
    https.get(url, (res) => {
        console.log(`Pinged ${url} - Status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`Error pinging ${url}: ${err.message}`);
    }); 
};

// Ping all URLs periodically
const interval = 5 * 60 * 1000; // 5 minutes in milliseconds
urls.forEach((url) => {
    ping(url); // Initial ping
    setInterval(() => ping(url), interval); // Repeat every 5 minutes
});
