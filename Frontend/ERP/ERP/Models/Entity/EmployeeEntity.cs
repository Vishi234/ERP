using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class EmployeeEntity
    {
        public string userId { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public string adharNo { get; set; }
        public string gender { get; set; }
        public string bloodgrp { get; set; }
        public string maritalst { get; set; }
        public string dob { get; set; }
        public string joinDate { get; set; }
        public string empCode { get; set; }
        public string empPunchCard { get; set; }
        public string empDepartment { get; set; }
        public string empDesignation { get; set; }
        public string empType { get; set; }
        public string imgPath { get; set; }
        public string  customerId { get; set; }
        public string operType { get; set; }
        public char flag { get; set; }
        public string reportId { get; set; }

        public string address { get; set; }
        public string country { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string pinCode { get; set; }
        public string phone { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }

        public string Username { get; set; }
        public string password { get; set; }
        public string defPage { get; set; }
        public string panCard { get; set; }
        public string accNumber { get; set; }
        public string accStatus { get; set; }
        public string bank { get; set; }
    }
}