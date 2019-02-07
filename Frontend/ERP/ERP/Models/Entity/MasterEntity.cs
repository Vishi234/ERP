using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class MasterEntity
    {
        public string  yearCode{get;set;}
        public string academicYear { get; set; }
        public string wfDate { get; set; }
        public string wtDate { get; set; }

        public char flag { get; set; }
    }



}