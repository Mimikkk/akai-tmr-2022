import { useRouter } from "next/router";

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
};

export default RoomPage;
