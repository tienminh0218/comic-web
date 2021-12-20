import { useRouteMatch, Switch, Route } from "react-router-dom";
import { HomePage, AddEditComic, Detail, UpChapter } from "./pages";

export const mainURL = "comics";

const Comic = () => {
    const math = useRouteMatch();

    return (
        <Switch>
            <Route exact path={math.url}>
                <HomePage mathUrl={math.url} />
            </Route>
            <Route path={`${math.url}/add`}>
                <AddEditComic />
            </Route>
            <Route path={`${math.url}/:comicId/edit`}>
                <AddEditComic />
            </Route>
            <Route path={`${math.url}/:comicId/detail`}>
                <Detail />
            </Route>
            <Route path={`${math.url}/:comicId/addChapter`}>
                <UpChapter />
            </Route>
            <Route path={`${math.url}/:comicId/:chapterId`}>
                <UpChapter />
            </Route>
        </Switch>
    );
};

export default Comic;
