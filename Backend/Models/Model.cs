namespace Backend.Models {
    public partial class ActionRequest {
        public string AccessToken { get; set; }
    }
    public partial class ActionSuccessResponse {
        public bool Success { get; set; }
    }
}