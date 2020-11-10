using System;
namespace Backend {
    public class ApiException : Exception
    {
        public int Code { get; set; }

        public ApiException(int Code, string Message) : base(Message)
        {
            this.Code = Code;
        }
    }
}