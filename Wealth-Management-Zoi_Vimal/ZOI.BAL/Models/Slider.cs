using System;
using System.Collections.Generic;
using System.Text;

namespace ZOI.BAL.Models
{
    public class Slider
    {
        public string Header { get; set; }
        public string values { get; set; }
        public string Subvalues { get; set; }
        public List<Slider> Details { get; set; }

    }
}
