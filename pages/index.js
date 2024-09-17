import { useRouter } from "next/router";
import MainContainer from "../components/MainContainer";
import Link from "next/link";

const Home = ({ posts }) => {
  return (
    <MainContainer>
      <h1 className="font-semibold text-4xl">List of posts</h1>
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 py-5 gap-10 max-md:w-4/5">
        {posts.map((post) => (
          <li
            key={post.id}
            className="shadow-2xl px-3 py-5 rounded-xl hover:scale-110 transition delay-100 duration-300 ease-in-out"
          >
            <Link href={`/posts/${post.id}`}>
              <h1 className="text-lg font-semibold">{post.title}</h1>
              <hr className="h-1 w-full my-3 rounded-full bg-black" />
              <p className="break-words overflow-hidden text-ellipsis line-clamp-4">
                {post.body}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </MainContainer>
  );
};

export default Home;

export async function getStaticProps(params) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await response.json();

  return {
    props: { posts },
  };
}
