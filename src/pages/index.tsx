import { GetStaticProps } from "next";
import { Header } from "../components/Header/index";

type Episode = {
  id: String;
  title: String;
  members: String; 
}

type HomeProps = {
  episodes: Array<Episode>;
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Hi, Im Andy, from Headspace.</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // every 8 hours.
  };
};