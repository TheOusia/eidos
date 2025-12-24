import { PageContextClient } from "vike/types";
import { redirect } from "vike/abort";
// import { onRenderClient } from "vike-vue/__internal/integration/onRenderClient";
import { BASE_URL } from "@src/utils/valync";

export default async function (context: PageContextClient) {
	try {
		const res = await fetch(BASE_URL + "/user-profile");
		if (res.status != 200) throw new Error();

		const data = (await res.json()) as ApiResponse<User>;
		if (data.status == "failed") {
			throw new Error();
		}

		context.user = data.data;
		// onRenderClient(context);
	} catch (e) {
		//
		if (!context.urlPathname.includes("/login")) {
			throw redirect("/login");
		}
	}
}
