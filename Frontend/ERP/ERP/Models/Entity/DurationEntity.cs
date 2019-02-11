using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class DurationEntity
    {
        public string academicYear { get; set; }
        public string course { get; set; }
        public string semester { get; set; }
        public string wefDate { get; set; }
        public string wetDate { get; set; }

        public char flag { get; set; }
    }



}