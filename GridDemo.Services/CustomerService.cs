using System;
using System.Collections.Generic;
using System.Linq;
using GridDemo.Models;

namespace GridDemo.Services
{
    public class CustomerService : ICustomerService
    {
        public CustomerService()
        {
        }

        public IPaginatedList<Customer> List(PageRequest pageRequest = default(PageRequest))
        {
            var customers = Enumerable.Range(1, 100).Select(index => new Customer()
            {
                Id = index,
                Name = GetRandomName(index),
                Email = $"customer{index}@mail.com"
            });

            return new PaginatedList<Customer>(customers, pageRequest);
        }

        private static string GetRandomName(int seed)
        {
            var random = new Random(DateTime.Now.Millisecond + seed);
            var maleNames = new[] { "John", "Jack", "James" };
            var femaleNames = new[] { "Jane", "Jessie", "Jade" };
            var lastNames = new[] { "Smith", "Martin", "Wesson" };
            var firstName = GetRandomItem(random.Next(1, 3) == 1 ? maleNames : femaleNames, random);
            var lastName = GetRandomItem(lastNames, random);
            return firstName + " " + lastName;
        }

        private static T GetRandomItem<T>(ICollection<T> items, Random random) => items.ElementAt(random.Next(0, items.Count));
    }
}
