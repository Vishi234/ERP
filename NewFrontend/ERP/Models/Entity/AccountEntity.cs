using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class AccountEntity
    {
        public string id { get; set; }
        public string feeName { get; set; }
        public string paymentType { get; set; }
        public string feeDesc { get; set; }
        public string feePeriod { get; set; }
        public string isActive { get; set; }
        public string feeMonth { get; set; }
        public char flag { get; set; }
        public string terms { get; set; }
        public string userId { get; set; }
        public string reportId { get; set; }
        public string customerId { get; set; }
        public string academicYear { get; set; }
        public string courseId { get; set; }
        public string feeType { get; set; }



        //     public string cWet { get; set; }
    }
}