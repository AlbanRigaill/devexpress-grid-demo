using System.Collections.Generic;

namespace GridDemo.Models
{
    public interface IPaginatedList<out T> : IReadOnlyCollection<T>
    {
        int StartIndex { get; }
        int TotalCount { get; }
    }
}
