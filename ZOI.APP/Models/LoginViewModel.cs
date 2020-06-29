using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ZOI.APP.Models.Base;

namespace ZOI.APP.Models
{
    public class LoginViewModel : BaseViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name ="Remember me")]
        public bool RememberMe { get; set; }
    }
}
