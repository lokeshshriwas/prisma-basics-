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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const Client = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Client.todo.findMany();
        console.log(data);
        res.send("First fetching is done");
    }
    catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, age, city } = req.body;
    const data = yield Client.user.create({
        data: {
            username,
            password,
            age,
            city
        }
    });
    if (data) {
        res.send("User created successfully");
    }
    else {
        res.send("something went wrong");
    }
}));
app.post("/addtodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, done, userId } = req.body;
    const data = yield Client.todo.create({
        data: {
            title,
            description,
            done,
            userId
        }
    });
    if (data) {
        res.send("Todo added successfully");
    }
    else {
        res.send("Something went wrong");
    }
}));
app.get('/details/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Client.user.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            username: true,
            city: true,
            age: true,
            todos: true
        }
    });
    if (data) {
        res.send(data);
    }
    else {
        res.send("Something went wrong");
    }
}));
app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});
