using System;
using System.Collections.Generic;
using System.Text;

namespace ZOI.BAL.Models
{
    public class ProductAssetCharts
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public List<ProductAssetCharts> Return { get; set; }
        public List<ProductAssetCharts> CostOfAverage { get; set; }
        public List<ProductAssetCharts> Marketvalue { get; set; }
    }
}
