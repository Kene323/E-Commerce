const express = require("express")
const {errorHandler} = require("./middleware/errorHandler")
require("dotenv").config()

// mongodb connection setup
const DBCONNECTION = require("./config/db")

// import routes
const sellerRoute = require("./route/sellerRoute")
const buyerRoute = require("./route/buyerRoute")
const adminRoute = require("./route/adminRoute")
const productRoute = require("./route/productRoute")
const reviewRoute = require("./route/reviewRoute")
const newsletterRoute = require("./route/newsletterRoute")
const commentNewsletterRoute = require("./route/commentNewsletterRoute")

const PORT = process.env.PORT

const app = express()
DBCONNECTION()
// middleware
app.use(express.json())

// route
app.use("/api/seller", sellerRoute)
app.use("/api/buyer", buyerRoute)
app.use("/api/admin", adminRoute)
app.use("/api/product", productRoute)
app.use("/api/review", reviewRoute)
app.use("/api/newsletter", newsletterRoute)
app.use("/api/comment", commentNewsletterRoute)

app.use(errorHandler)

const server = app.listen(PORT, () => {
console.log(`Server is running at ${PORT}`);
})

server.on("error", (err) => { 
    if (err.code === "EADDRINUSE"){
        console.log(`This ${PORT} is in use`);
    }else{
        console.log("Error starting server", err);
    }
    process.exit(1)
})

process.on("uncaughtException", (error)=>{
    console.log(("Server is shutting down due to uncaughtException", error));
    process.exit(1)
})

process.once("unhandledRejection", (error)=>{
    console.log("Server is shutting down due to unhandledRejection", error);
    server.close(()=>{
        process.exit(1)
    })
})