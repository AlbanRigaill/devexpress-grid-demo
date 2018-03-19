using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace GridDemo.Models
{
    public class PaginatedList<T> : IPaginatedList<T>
    {
        private const BindingFlags GetPropertyIgnoreCaseFlags = BindingFlags.IgnoreCase | BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance;
        private readonly IReadOnlyCollection<T> innerCollection;

        public PaginatedList(IEnumerable<T> items, PageRequest pageRequest)
        {
            var totalCount = items?.Count();

            if (items == null || totalCount == null || totalCount.Value == 0)
            {
                this.innerCollection = Enumerable.Empty<T>().ToArray();
                return;
            }

            // Filtering
            var filteredList = FilterGenericGrid(items.ToList(), pageRequest.Filters);

            // ReSharper disable once PossibleMultipleEnumeration
            this.TotalCount = filteredList.Count();

            // Sorting 
            var sortedList = SortByProperty(filteredList, pageRequest.SortPropertyName, pageRequest.IsSortDescending);

            // ReSharper disable once PossibleMultipleEnumeration
            var query = sortedList.Skip(pageRequest.StartIndex).Take(pageRequest.Size);

            this.innerCollection = query.ToArray();
            this.StartIndex = pageRequest.StartIndex;
            this.Count = this.innerCollection.Count;
        }


        private IEnumerable<T> FilterGenericGrid(List<T> list, List<Filter> filters)
        {
            if (filters != null && filters.Count > 0 && list != null && list.Count > 0)
            {
                foreach (var filter in filters)
                {
                    Type itemType = typeof(T);
                    var property = filter.ColumnName.First().ToString().ToUpper() + filter.ColumnName.Substring(1);

                    list = list.Where(a => itemType
                        .InvokeMember(property, System.Reflection.BindingFlags.GetProperty, null, a, null).ToString().ToLower().Contains(filter.Value.ToLower()))
                        .ToList();
                }
            }

            return list;
        }

        private static IEnumerable<T> SortByProperty(IEnumerable<T> list, string propertyName, bool isDescending = false)
        {
            if (string.IsNullOrEmpty(propertyName) == true)
            {
                return list;
            }

            Type itemType = typeof(T);
            var sortProperty = itemType.GetProperty(propertyName, GetPropertyIgnoreCaseFlags);

            if (sortProperty != null)
            {
                object sort(T entity) => itemType.InvokeMember(sortProperty.Name, BindingFlags.GetProperty, null, entity, null);
                list = isDescending == false ? list.OrderBy(sort) : list.OrderByDescending(sort);
            }

            return list;
        }


        public int StartIndex { get; set; }

        public int TotalCount { get; set; }

        public int Count { get; set; }

        public IEnumerator<T> GetEnumerator() => this.innerCollection.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => ((IEnumerable)this.innerCollection).GetEnumerator();
    }
}