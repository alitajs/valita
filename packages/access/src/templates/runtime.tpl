import { access } from "./index";

export function onMounted({ app }) {
    app.use(access);
}