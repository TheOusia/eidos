import { Err, Ok, Result } from "ts-results-es";

export const BASE_URL = "http://localhost:8000/api/";

export const valync = async <T>(
	url: string,
	init?: RequestInit,
): Promise<Result<T, ApiError>> => {
	try {
		const response = await fetch(encodeURI(`${BASE_URL}${url}`), init);
		if (response.status != 200) {
			return Err((await response.json()) as ApiError);
		}

		const resp = (await response.json()) as ApiResponse<T>;
		if (resp.status == "failed") {
			return Err(resp.error);
		}

		return Ok(resp.data);
	} catch (e) {
		return Err({
			name: "Network Error",
			message: "Error connecting to server",
		});
	}
};
