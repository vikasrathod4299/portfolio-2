import { createRoute } from "@tanstack/react-router";
import type { RootRoute } from "@tanstack/react-router";
import BlogPage from "./Blog";

export function BlogRoute(parentRoute: RootRoute) {

    const blogRoute = createRoute({
        getParentRoute: () => parentRoute,
        path: '/blog',
        component: BlogPage,
    });

    return blogRoute;
}