using System;
using System.Collections.Generic;
using System.Text;

namespace ZOI.BAL.Models
{
    public class MfReports
    {
        public double Id { get; set; }
        public string AMC { get; set; }
        public string Scheme { get; set; }
        public string Folio { get; set; }
        public string Category { get; set; }
        public string InTransit { get; set; }
        public string BuyOrSell { get; set; }
        public DateTime Date { get; set; }
        public decimal Unit { get; set; }
        public decimal NAV { get; set; }
        public decimal Value { get; set; }
        public DateTime MaturityDate { get; set; }
    }
}
