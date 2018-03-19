using System.Collections.Generic;
using GridDemo.Models;

namespace GridDemo.Web.Requests
{
    public class PageRequestParameters
    {
        public int StartIndex { get; set; }
        
        public int PageSize { get; set; }
        
        public string OrderBy { get; set; }
        
        public bool IsSortDescending { get; set; }
        
        public List<Filter> Filters { get; set; }

        public static implicit operator PageRequest(PageRequestParameters source)
        {
            return new PageRequest(source.StartIndex, source.PageSize, source.OrderBy, source.IsSortDescending, source.Filters);
        }
    }
}