import { ComponentStory, ComponentMeta } from "@storybook/react";
import { sprinkles } from "../../theme";

import { Stack as StackComponent } from "./Stack";

export default {
  title: "Design System/Stack",
  component: StackComponent,
} as ComponentMeta<typeof StackComponent>;

const Template: ComponentStory<typeof StackComponent> = (args) => (
  <StackComponent {...args} />
);

export const Stack = Template.bind({});
Stack.args = {
  space: "4",
  children: Array(4)
    .fill(null)
    .map((_, i) => (
      <div
        key={i}
        className={sprinkles({
          width: "full",
        })}
        style={{
          height: "40px",
          backgroundColor: "gray",
        }}
      />
    )),
};
