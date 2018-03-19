using System;
using System.Collections.Generic;
using System.Text;

namespace GridDemo.Models
{
    [Serializable]
    public class Filter
    {
        public string ColumnName { get; set; }
        public string Value { get; set; }
    }
}
