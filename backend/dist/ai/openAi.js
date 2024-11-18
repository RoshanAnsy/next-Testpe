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
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.API_KEY,
    organization: process.env.organization
});
const OpenAi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pram, num } = req.body;
    //  const thumbnail=req.files.file;
    console.log("text heading is", pram);
    //  console.log("this is pdf",thumbnail);
    try {
        const completion = yield openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: " Do not include any explanations, only provide a  RFC8259 compliant JSON response  ",
                },
                { role: "user", content: `generate ${num} questins OF ${pram} with 4 options and  answer` },
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: { type: "json_object" },
            temperature: 0.7,
        });
        const result = completion.choices[0].message.content;
        //create the db map
        // await  dbEntry(result)
        console.log(completion);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({
            err: err,
            success: false,
        });
    }
});
// async function dbEntry(data){
//     try{
//     console.log(data.type)
//         data.map((item,index)=>{
//             const result=[]
//             result.push(item.answer);
//             console.log(result)
//         })
//     }catch(err){
//         console.log(err.message)
//     }
// }
exports.default = { OpenAi };
