import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Label as LabelComponent } from "./Label";

export default {
  title: "Components/Label",
  component: LabelComponent,
} as ComponentMeta<typeof LabelComponent>;

const Template: ComponentStory<typeof LabelComponent> = (args) => (
  <LabelComponent {...args} />
);

export const Label = Template.bind({});
Label.args = {
  children: "First Name",
};
