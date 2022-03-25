interface Options {
	method: string;
	headers?: {
		'content-type': string;
	};
	body?: string;
}

export class Api {
   public static createHeaders(
      method: string = 'GET',
      body: any = null,
   ) {
      const options: Options = {
         method,
         headers: {
            'content-type': 'application/json'
         }
      };
      if (body) options.body = JSON.stringify(body);
      return options;
   }

   public static handleError(error: any) {
      return {
         error: true,
         data: {},
         errorInfo: error,
      };
   }
   
   public static async handleResponse(response: any) {
      const data = await response.json();
      return {
         error: false,
         data,
         errorInfo: null,
      }
   }
}
