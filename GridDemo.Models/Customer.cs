using System.Collections.Generic;

namespace GridDemo.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public IList<Application> Applications { get; set; }
    }
}
