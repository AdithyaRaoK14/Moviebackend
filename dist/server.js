"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./modules/auth");
var user_1 = require("./handlers/user");
var app = (0, express_1.default)();
var cookieParser = require("cookie-parser");
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(cookieParser());
app.use(express_1.default.json()); //parse json body
app.use(express_1.default.urlencoded({ extended: true })); //parse urlencoded body
app.get("/", function (req, res, next) {
    // next(new Error("Something went wrong")); //test error handling asychronously
    res.status(200).json({ message: "hello" }).end();
});
app.use("/api", auth_1.protect, router_1.default); //everything in router will be prefixed with /api
app.post("/signin", user_1.signIn);
app.post("/user", user_1.createUser);
app.put("/user", auth_1.protect, user_1.updateUser);
app.get("/user", auth_1.protect, user_1.getUser);
app.get("/users", auth_1.protect, user_1.getAllUsers);
app.delete("/user", auth_1.protect, user_1.deleteUser);
app.use(function (err, req, res, next) {
    if (err.type === "auth") {
        return res.status(401).json({ message: "unauthorized" + err.message });
    }
    else if (err.type === "input") {
        return res.status(400).json({ message: "bad request" });
    }
    else
        return res.status(500).json({ message: "server error" + err.message });
});
exports.default = app;
//# sourceMappingURL=server.js.map