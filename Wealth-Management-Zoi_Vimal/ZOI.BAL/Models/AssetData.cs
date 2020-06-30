using System;
using System.Collections.Generic;
using System.Text;

namespace ZOI.BAL.Models
{
    public class AssetData
    {
        public string AssetClass { get; set; }
        public string ValueAtCost { get; set; }
        public string MarketValue { get; set; }
        public string Weightage { get; set; }
        public string UnrealizedGL { get; set; }
    }
}
