"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = exports.getUser = exports.updateUser = exports.signIn = exports.createUser = void 0;
var db_1 = __importDefault(require("../db"));
var auth_1 = require("../modules/auth");
var createUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, user, token, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                };
                return [4 /*yield*/, (0, auth_1.hashPassword)(req.body.password)];
            case 1:
                userData = (_a.password = _b.sent(),
                    _a.genres = "",
                    _a);
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, db_1.default.user.create({
                        data: userData,
                    })];
            case 3:
                user = _b.sent();
                token = (0, auth_1.createJWT)(user);
                res.json({ token: token });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                err_1.type = "input";
                next(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isValid, token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1.default.user.findUnique({
                        where: {
                            email: req.body.email,
                        },
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, auth_1.comparePassword)(req.body.password, user.password)];
            case 2:
                isValid = _a.sent();
                if (!isValid) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid credentials" })];
                }
                token = (0, auth_1.createJWT)(user);
                res.cookie("authToken", token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    domain: "netlify",
                });
                delete user.password;
                return [2 /*return*/, res.json({ token: token, user: user })];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(401).json({ message: "Invalid credentials" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
var updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updateData, _a, _b, user, token, err_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                updateData = {};
                if (req.body.email) {
                    updateData["email"] = req.body.email;
                }
                if (req.body.firstName) {
                    updateData["firstName"] = req.body.firstName;
                }
                if (req.body.lastName) {
                    updateData["lastName"] = req.body.lastName;
                }
                if (!req.body.password) return [3 /*break*/, 2];
                _a = updateData;
                _b = "password";
                return [4 /*yield*/, (0, auth_1.hashPassword)(req.body.password)];
            case 1:
                _a[_b] = _c.sent();
                _c.label = 2;
            case 2:
                if (req.body.genres) {
                    updateData["genres"] = req.body.genres;
                }
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, db_1.default.user.update({
                        where: {
                            id: req.user.id,
                        },
                        data: updateData,
                    })];
            case 4:
                user = _c.sent();
                token = (0, auth_1.createJWT)(user);
                delete user.password;
                res.json({ token: token, user: user });
                return [3 /*break*/, 6];
            case 5:
                err_3 = _c.sent();
                err_3.type = "input";
                next(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.user.findUnique({
                        where: {
                            id: req.user.id,
                        },
                    })];
            case 1:
                user = _a.sent();
                res.status(200).json(user);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                err_4.type = "input";
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (req.user.role !== "admin") {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, db_1.default.user.findMany({
                        where: {
                            NOT: {
                                id: req.user.id,
                            },
                        },
                    })];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                err_5.type = "input";
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (req.user.role !== "admin") {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, db_1.default.user.delete({
                        where: {
                            id: req.body.id,
                        },
                    })];
            case 1:
                user = _a.sent();
                res.status(200).json({ data: user });
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                err_6.type = "input";
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map