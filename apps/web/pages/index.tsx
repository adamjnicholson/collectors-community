import { Button } from "ui";
import prisma from "../lib/prisma";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function Web(props: Props) {
  return (
    <div>
      <h1>Web</h1>
      <Button />
      {props.feed.map((post) => (
        <div key={post.id}>
          <>
            {post.title}
            {post.createdAt}
            {post.author.name}
          </>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });

  const feedWithStringData = feed.map((f) => ({
    ...f,
    createdAt: f.createdAt.getTime(),
    updatedAt: f.updatedAt.getTime(),
  }));

  return {
    props: { feed: feedWithStringData },
  };
};
