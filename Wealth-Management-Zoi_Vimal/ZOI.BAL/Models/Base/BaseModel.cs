using System;
using System.Collections.Generic;
using System.Text;

namespace ZOI.BAL.Models.Base
{

    public class BaseModel
    {
        //Base Model consist fields which are common for all the table
        public int Id { get; set; }

        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
