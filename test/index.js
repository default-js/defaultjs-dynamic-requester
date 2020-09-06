import { Requester } from "../index";

describe("Test", () => {
	it("request with dynamic url", async () => {
		const context = { target: "test-1.json" };
		const url = "/data/${target}";
		const requester = new Requester({ url });
		const request = await requester.buildRequest({ context });
		expect(request.url.pathname).toBe("/data/test-1.json");
	});

	it("request with dynamic search", async () => {
		const context = {
			param1: "value1",
			param2: "value2",
		};
		const search = {
			param1: "${param1}",
			param2: "${param2}",
		};
		const requester = new Requester({ url: "", search });
		const request = await requester.buildRequest({ context });
		expect(request.url.search).toBe("?param1=value1&param2=value2");
	});

	it("request with dynamic search with array", async () => {
		const context = {
			param1: "value1",
			param2: "value2",
		};
		const search = {
			array: ["${param1}", "${param2}"],
		};
		const requester = new Requester({ url: "", search });
		const request = await requester.buildRequest({ context });
		expect(request.url.search).toBe("?array=value1&array=value2");
	});

	it("request with dynamic headers", async () => {
		const context = {
			header1: "value1",
			header2: "value2",
		};
		const headers = {
			header1: "${header1}",
			header2: "${header2}",
		};
		const requester = new Requester({ url: "", headers });
		const request = await requester.buildRequest({ context });
		expect(request.headers.get("header1")).toBe("value1");
		expect(request.headers.get("header2")).toBe("value2");
	});

	it("request with dynamic headers with array", async () => {
		const context = {
			header1: "value1",
			header2: "value2",
		};
		const headers = {
			array: ["${header1}", "${header2}"],
		};
		const requester = new Requester({ url: "", headers });
		const request = await requester.buildRequest({ context });
		expect(request.headers.get("array")).toBe("value1, value2");
	});
});
