import home from "./home";
import title from "./title";
import user from "./user";
import discover from "./discover";

const GLOBAL_PREFIX = "/api";

function route(app) {
    app.use(`${GLOBAL_PREFIX}/home`, home);
    app.use(`${GLOBAL_PREFIX}/titles`, title);
    app.use(`${GLOBAL_PREFIX}/discover`, discover);
    app.use(`${GLOBAL_PREFIX}/users`, user);
}

export default route;
