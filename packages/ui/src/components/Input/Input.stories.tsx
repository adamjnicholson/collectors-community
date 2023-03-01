import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input as InputComponent } from "./Input";

export default {
  title: "Components/Input",
  component: InputComponent,
} as ComponentMeta<typeof InputComponent>;

const Template: ComponentStory<typeof InputComponent> = (args) => (
  <InputComponent {...args} />
);

export const Input = Template.bind({});
Input.args = {
  type: "text",
  placeholder: "Name",
};
