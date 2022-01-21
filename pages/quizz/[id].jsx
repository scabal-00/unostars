import { Fragment } from "react";
import { useRouter } from "next/router";

import { Navbar } from "../../components";

const Quizz = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Fragment>
      <Navbar />
      Quizz: {id}
    </Fragment>
  );
};

export default Quizz;
