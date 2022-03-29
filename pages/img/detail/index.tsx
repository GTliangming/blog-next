
import withConstants from "utils/withConstants";
import FolderDetail from "views/img/detail";
export default withConstants(FolderDetail);
export const getServerSideProps = async (ctx: Global.Context) => {
    return {
        props: {
            name: ctx.query?.name
        },
    };
};