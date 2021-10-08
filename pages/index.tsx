import { GetServerSideProps } from "next";
import Index from "views/Index";

export const getServerSideProps: GetServerSideProps<Partial<{}>> = async () => {
  return {
    props: {
    }
  };
};

export default Index;
