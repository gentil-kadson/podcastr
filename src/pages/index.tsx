import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import convertDurationToTimeString from "../utils/convertDurationToTimeString";
import { ptBR } from "date-fns/locale";
import api from "../services/api";

type Episode = {
  id: String;
  title: String;
  members: String;
  //...
};

type HomeProps = {
  episodes: Array<Episode>;
};

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Hi, Im Andy, from Headspace.</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get(
    "episodes?_limit=12&_sort=published_at&_order=desc",
    {
      params: {
        _limit: 12,
        _sort: "published_at",
        _order: "desc",
      },
    }
  );

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy"),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    };
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // every 8 hours.
  };
};
