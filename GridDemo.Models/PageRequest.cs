using System;
using System.Collections.Generic;

namespace GridDemo.Models
{
    public struct PageRequest
    {
        private const int DefaultPageSize = 10;
        private const int MaxPageSize = 100;

        public PageRequest(int startIndex = 0, int? pageSize = null, string sortPropertyName = null, bool isSortDescending = false, List<Filter> filters = null)
        {
            this.StartIndex = Math.Max(0, startIndex);
            this.Size = Math.Max(0, Math.Min(MaxPageSize, pageSize ?? DefaultPageSize));
            this.SortPropertyName = sortPropertyName;
            this.IsSortDescending = isSortDescending;
            this.Filters = filters;
        }

        public int StartIndex { get; }
        public int Size { get; }
        public string SortPropertyName { get; }
        public bool IsSortDescending { get; }
        public List<Filter> Filters { get; }
    }
}