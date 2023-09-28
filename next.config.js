
module.exports = {
     reactStrictMode: true,
     images: {
          remotePatterns: [
               {
                    protocol: "https",
                    hostname: "firebasestorage.googleapis.com",
               },
               {
                    protocol: "https",
                    hostname: "img.freepik.com",
               },
               {
                    protocol: "https",
                    hostname: "images.unsplash.com",
               }
               
          ],
     },
};