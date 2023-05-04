import { access } from "./core";

export function onMounted({ app }) {
    app.use(access);
}