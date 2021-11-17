import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "remix";
import { useLoaderData, Form } from "remix";
import { Link } from "react-router-dom";

import { prisma } from "../db";

import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let action: ActionFunction = async ({ request }) => {
  let body = new URLSearchParams(await request.text());

  await prisma.user.create({
    data: {
      name: body.get("name")!,
      email: body.get("email")!,
    },
  });

  return redirect("/");
};

export let loader: LoaderFunction = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

export default function Index() {
  let data = useLoaderData();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Form method="post">
        <p>
          name <input type="text" name="name"></input>
        </p>
        <p>
          email <input type="email" name="email"></input>
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </Form>
    </div>
  );
}
