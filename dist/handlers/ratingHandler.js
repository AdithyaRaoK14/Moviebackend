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
exports.updateRating = exports.createRating = exports.getRating = void 0;
var db_1 = __importDefault(require("../db"));
var getRating = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, sum, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.rating.aggregate({
                        _sum: {
                            userRating: true,
                        },
                        _count: {
                            userId: true,
                        },
                        where: {
                            movieId: +req.params.movieId,
                        },
                    })];
            case 1:
                query = _a.sent();
                sum = (query._sum.userRating / query._count.userId).toFixed(1);
                res.status(200).json({ data: sum });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                err_1.type = "input";
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRating = getRating;
var createRating = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var findExistingRating, rating, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, db_1.default.rating.findUnique({
                        where: {
                            userId_movieId: {
                                userId: req.user.id,
                                movieId: +req.params.movieId,
                            },
                        },
                    })];
            case 1:
                findExistingRating = _a.sent();
                if (!findExistingRating) return [3 /*break*/, 2];
                req.id = findExistingRating.id;
                return [2 /*return*/, (0, exports.updateRating)(req, res, next)];
            case 2: return [4 /*yield*/, db_1.default.rating.create({
                    data: {
                        movieId: +req.params.movieId,
                        userId: req.user.id,
                        userRating: req.body.userRating,
                    },
                })];
            case 3:
                rating = _a.sent();
                res.status(200).json({ data: rating });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                err_2.type = "input";
                next(err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createRating = createRating;
var updateRating = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rating, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.rating.update({
                        where: {
                            userId_movieId: {
                                userId: req.user.id,
                                movieId: +req.params.movieId,
                            },
                        },
                        data: {
                            userRating: req.body.userRating,
                        },
                    })];
            case 1:
                rating = _a.sent();
                res.status(200).json({ data: rating });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                err_3.type = "input";
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateRating = updateRating;
//# sourceMappingURL=ratingHandler.js.map