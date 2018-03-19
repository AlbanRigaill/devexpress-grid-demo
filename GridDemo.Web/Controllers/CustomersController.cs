using GridDemo.Services;
using GridDemo.Web.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GridDemo.Web.Controllers
{
    public class CustomersController : ApiController
    {
        private readonly ICustomerService customerService;

        public CustomersController(ICustomerService customerService)
        {
            this.customerService = customerService;
        }

        [HttpPost("[action]")]
        public JsonResult List([FromBody] PageRequestParameters request)
        {
            var result = this.customerService.List(request);
            return Json(new { Customers = result, result.TotalCount });
        }
    }
}
