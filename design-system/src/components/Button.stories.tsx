
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => <Button>Click me</Button>;

export const Secondary = () => <Button variant="secondary">Secondary</Button>;

export const Outline = () => <Button variant="outline">Outline</Button>;

export const Small = () => <Button size="small">Small</Button>;

export const Large = () => <Button size="large">Large</Button>;

export const Disabled = () => <Button disabled>Disabled</Button>;
