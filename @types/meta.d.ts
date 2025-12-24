// https://vike.dev/pageContext#typescript
declare global {
	namespace Vike {
		interface PageContext {
			user?: User;
		}
	}
}

export {};
