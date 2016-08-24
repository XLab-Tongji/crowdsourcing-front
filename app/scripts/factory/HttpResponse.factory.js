;void function(){

	app.factory("HttpResponseFactory", HttpResponseFactory)

	function HttpResponseFactory(){
		return {
			isResponseSuccess: isResponseSuccess,
			isServerResponse: isServerResponse,
			getResponseMessage: getResponseMessage,
			getResponseData: getResponseData,
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

	function isServerResponse(response){
		if(response.success === undefined){
			return false
		}else{
			return true
		}
	}
}()
