import { Form, ActionFunction, redirect } from "remix";
import { prisma } from "../../../db";

export let action: ActionFunction = async ({ request }) => {
  let body = new URLSearchParams(await request.text());

  let brandName = body.get("name");

  if (!brandName) {
    // handle error case
    return;
  }

  await prisma.brand.create({
    data: {
      name: brandName,
    },
  });

  return redirect(request.url);
};

export default function New() {
  return (
    <div>
      <h1>Create a new brand</h1>
      <Form method="post">
        <input type="text" name="name" placeholder="Pokemon" />
        <button type="submit">Create brand</button>
      </Form>
    </div>
  );
}
