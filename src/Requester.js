import Resolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";

const buildURL = async (context, url, search, hash) => {
	const result = new URL(await Resolver.resolveText(url, context), location.href);

	if (search) {
		if (!result.searchParams) result.searchParams = new URLSearchParams();
		const params = result.searchParams;

		for (let key in search) {
			const value = search[key];
			if (typeof value === "string") params.append(key, await Resolver.resolveText(value, context));
			else if (value instanceof Array) {
				for (let item of value) {
					if (typeof item === "string") params.append(key, await Resolver.resolveText(item, context));
				}
			}
		}
	}

	if (hash) result.hash = hash;

	return result;
};

const buildMethod = async (context, method) => {
	if (method && typeof method === "string") return Resolver.resolveText(method, context);

	return "get";
};

const buildHeaders = async (context, headers) => {
	const result = new Headers();
	if (headers) {
		for (let key in headers) {
			const value = headers[key];
			if (typeof value === "string") result.append(key, await Resolver.resolveText(value, context));
			else if (value instanceof Array) {
				for (let item of value) {
					if (typeof item === "string") result.append(key, await Resolver.resolveText(item, context));
				}
			}
		}
	}

	return result;
};

const buildBody = async (context, body) => {
	if (body && typeof body === "string") return Resolver.resolveText(body, context);

	return body;
};

class Requester {
	constructor({ url, method = "get", search, hash, headers, body, credentials, mode, cache, redirect, referrer, referrerPolicy }) {
		this.url = url;
		this.method = method;
		this.search = search;
		this.hash = hash;
		this.headers = headers;
		this.body = body;
		this.credentials = credentials;
		this.mode = mode;
		this.cache = cache;
		this.redirect = redirect;
		this.referrer = referrer;
		this.referrerPolicy = referrerPolicy;
	}

	async buildRequest({ context }) {
		return {
			url: await buildURL(context, this.url, this.search, this.hash),
			method: await buildMethod(context, this.method),
			headers: await buildHeaders(context, this.headers),
			body: await buildBody(context, this.body),
			credentials: await Resolver.resolveText(this.credentials, context, this.credentials),
			mode: await Resolver.resolveText(this.mode, context, this.mode),
			cache: await Resolver.resolveText(this.cache, context, this.cache),
			redirect: await Resolver.resolveText(this.redirect, context, this.redirect),
			referrer: await Resolver.resolveText(this.referrer, context, this.referrer),
			referrerPolicy: await Resolver.resolveText(this.referrerPolicy, context, this.referrerPolicy),
		};
	}

	async execute({ context }) {
		const { url, method, headers, body, credentials, mode, cache, redirect, referrer, referrerPolicy } = await this.buildRequest({ context });

		return fetch(url.toString(), { method, headers, body, credentials, mode, cache, redirect, referrer, referrerPolicy });
	}
}
export default Requester;
