using System.Collections.Generic;
using GridDemo.Models;

namespace GridDemo.Services
{
    public interface ICustomerService
    {
        IPaginatedList<Customer> List(PageRequest pageRequest = default(PageRequest));
        Customer Get(string email);
        List<Customer> GetById(List<int> idList);
    }
}