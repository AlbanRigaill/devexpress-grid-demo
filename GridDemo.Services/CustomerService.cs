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
                Email = $"client{index}@bdo.fr"
            });

            return new PaginatedList<Customer>(customers, pageRequest);
        }

        public Customer Get(string email)
        {
            return this.List().FirstOrDefault(x => x.Email == email);
        }

        public List<Customer> GetById(List<int> idList)
        {
            var customers = new List<Customer>();
            foreach (var id in idList)
            {
                customers.Add(new Customer
                {
                    Id = id,
                    Name = GetRandomName(id),
                    Email = $"client{id}@bdo.fr"
                });
            }

            return customers;
        }

        private static string GetRandomName(int seed)
        {
            var random = new Random(DateTime.Now.Millisecond + seed);
            var maleNames = new[] { "Alban", "Adrien", "Benoit" };
            var femaleNames = new[] { "Alice", "Elisabeth", "Léa" };
            var lastNames = new[] { "Dupont", "Martin", "Gemin" };
            var firstName = GetRandomItem(random.Next(1, 3) == 1 ? maleNames : femaleNames, random);
            var lastName = GetRandomItem(lastNames, random);
            return firstName + " " + lastName;
        }

        private static T GetRandomItem<T>(ICollection<T> items, Random random) => items.ElementAt(random.Next(0, items.Count));
    }
}
