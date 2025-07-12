import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from './Button';
export default {
    title: 'Components/Button',
    component: Button,
};
export const Primary = () => _jsx(Button, { children: "Click me" });
export const Secondary = () => _jsx(Button, { variant: "secondary", children: "Secondary" });
export const Outline = () => _jsx(Button, { variant: "outline", children: "Outline" });
export const Small = () => _jsx(Button, { size: "small", children: "Small" });
export const Large = () => _jsx(Button, { size: "large", children: "Large" });
export const Disabled = () => _jsx(Button, { disabled: true, children: "Disabled" });
