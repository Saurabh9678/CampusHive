import * as Views from "./views";
import Error from "./views/Error";

var routes = [
    {
        path: '/dashboard',
        element: <Views.Dashboard />
    },
    {
        path: '/play',
        element: <Views.Play />
    },
    {
        path: '/chat',
        element: <Views.Chat />
    },
    {
        path: '*',
        element: <Error />
    },
]

export default routes

