"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disabled = exports.Large = exports.Small = exports.Outline = exports.Secondary = exports.Primary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("./Button");
exports.default = {
    title: 'Components/Button',
    component: Button_1.Button,
};
const Primary = () => (0, jsx_runtime_1.jsx)(Button_1.Button, { children: "Click me" });
exports.Primary = Primary;
const Secondary = () => (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "secondary", children: "Secondary" });
exports.Secondary = Secondary;
const Outline = () => (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", children: "Outline" });
exports.Outline = Outline;
const Small = () => (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "small", children: "Small" });
exports.Small = Small;
const Large = () => (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "large", children: "Large" });
exports.Large = Large;
const Disabled = () => (0, jsx_runtime_1.jsx)(Button_1.Button, { disabled: true, children: "Disabled" });
exports.Disabled = Disabled;
