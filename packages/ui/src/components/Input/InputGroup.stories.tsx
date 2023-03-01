import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InputGroup as InputGroupComponent } from "./Input";

export default {
  title: "Components/InputGroup",
  component: InputGroupComponent,
} as ComponentMeta<typeof InputGroupComponent>;

const Template: ComponentStory<typeof InputGroupComponent> = (args) => (
  <InputGroupComponent {...args} />
);

export const InputGroup = Template.bind({});
InputGroup.args = {
  label: "First Name",
  name: "firstName",
  type: "text",
};
