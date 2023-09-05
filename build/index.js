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
const fs_1 = __importDefault(require("fs"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const node_cron_1 = __importDefault(require("node-cron"));
const getWaterLevelData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_1.default.launch();
        const [page] = yield browser.pages();
        yield page.goto('https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/main.do', { waitUntil: 'networkidle0' });
        const data = yield page.content();
        fs_1.default.writeFile([__dirname, 'assets', `${new Date().toISOString()}.htm`].join('/'), data, (err) => {
            if (err)
                console.log(err.message);
        });
        yield browser.close();
    }
    catch (err) {
        console.error(err);
    }
});
node_cron_1.default.schedule("0 * * * *", () => {
    getWaterLevelData()
        .then(() => console.log("Saved Water Level at " + new Date().toISOString()))
        .catch((err) => console.log(err));
});
//# sourceMappingURL=index.js.map