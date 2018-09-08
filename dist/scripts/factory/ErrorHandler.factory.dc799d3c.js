;void function(){

	angular.module("crowdsourcing")
		.factory("ErrorHandlerFactory", ErrorHandlerFactory)

	ErrorHandlerFactory.$inject = ["ToasterTool", "HttpResponseFactory"]

	function ErrorHandlerFactory(ToasterTool, HttpResponseFactory){
		var COMMON_ERROR_MESSAGE = "网络连接错误，请重试"

		return {
			handle: handle,
		}

		function handle(error){
			if(HttpResponseFactory.isServerResponse(error)){
				var message = getErrorMessage(error)
				showErrorTip(message)
			}else{
				showErrorTip(COMMON_ERROR_MESSAGE)
			}
		}

		function isServerError(error){
			return HttpResponseFactory.isServerResponse(error)
		}

		function getErrorMessage(error){
			return HttpResponseFactory.getResponseMessage(error)
		}

		function showErrorTip(errorTip){
			ToasterTool.error(errorTip)
		}
	}

}()
