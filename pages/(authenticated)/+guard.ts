import { PageContextClient } from "vike/types";

export default function (context: PageContextClient) {
	context.isHydration = false;
}
