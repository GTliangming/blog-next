
import withConstants from "utils/withConstants";
import Mine from "views/mine";

export default withConstants(Mine);
export const getServerSideProps = async (ctx: Global.Context) => {
    const name = ctx.query.name;
    return {
        props: {
            name: name ? name : null
        },
    };
};