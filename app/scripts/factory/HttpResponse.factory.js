;void function(){

	app.factory("HttpResponseFactory", HttpResponseFactory)

	function HttpResponseFactory(){
		return {
			isResponseSuccess: isResponseSuccess,
			isServerResponse: isServerResponse,
			getResponseMessage: getResponseMessage,
			getResponseData: getResponseData,
			getResponsePaginator: getResponsePaginator
		}
	}

	function isResponseSuccess(response){
		return response.success
	}

	function getResponseMessage(response){
		return response.message
	}

	function getResponseData(response){
		return response.data
	}

	function getResponsePaginator(response){
		return response.paginator
	}

	function isServerResponse(response){
		if(response.success === undefined){
			return false
		}else{
			return true
		}
	}
}()
