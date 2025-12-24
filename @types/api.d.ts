type Status = "success" | "failed";

type ApiError = {
	name: string;
	message: string;
};

type SuccessResponse<T> = {
	status: "success";
	data: T;
};

type ErrorResponse = {
	status: "failed";
	error: ApiError;
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
