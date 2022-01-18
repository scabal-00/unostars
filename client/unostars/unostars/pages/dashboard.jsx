import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Dashboard() {
  return <div>dashboard</div>;
}

export const getServerSideProps = withPageAuthRequired();
