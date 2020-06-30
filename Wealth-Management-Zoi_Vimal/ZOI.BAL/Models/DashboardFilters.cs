using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ZOI.BAL.Models
{
    public class DashboardFilters
    {
        [Display(Name = "Customer Level")]
        public string CustomerLevel { get; set; }

        [Display(Name = "Proto Type Level")]
        public string ProtoTypeLevel { get; set; }

        [Display(Name = "Account Level")]
        public string AccountLevel { get; set; }

        [Display(Name = "Report Date")]
        public string ReportDate { get; set; }

        public IEnumerable<SelectListItem> CustomerLevelList { get; set; } 
        public IEnumerable<SelectListItem> ProtoTypeLevelList { get; set; }
        public IEnumerable<SelectListItem> AccountLevelList { get; set; }
    }
}
