import { useRouter } from "next/router";
import MainContainer from "../../components/MainContainer";

export default function Post({ post }) {
  const router = useRouter();

  return (
    <MainContainer keywords={post.title}>
      <button
        className="font-semibold text-2xl mb-10 hover:text-blue-500 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Return to the main page
      </button>

      <div>
        <h1 className="font-semibold text-4xl mb-10">{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </MainContainer>
  );
}

export async function getStaticPaths() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await response.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await response.json();

  return {
    props: { post },
  };
}
