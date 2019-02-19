using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.Entity
{
    public class AcademicEntity
    {
        public string yearCode { get; set; }
        public string academicYear { get; set; }
        public string wfDate { get; set; }
        public string wtDate { get; set; }
        public string reportId { get; set; }
        public char flag { get; set; }
    }
    public class DurationEntity
    {
        public string id { get; set; }
        public string academicYear { get; set; }
        public string course { get; set; }
        public string semester { get; set; }
        public string wefDate { get; set; }
        public string wetDate { get; set; }

        public string reportId { get; set; }

        public char flag { get; set; }
    }
    public class CourseEntity
    {
        public string courserId { get; set; }
        public string courseName { get; set; }
        public string noOfSemester { get; set; }
        public string reportId { get; set; }
        public char flag { get; set; }
    }
    public class ActivityEntity
    {
        public string id { get; set; }
        public string actName { get; set; }
        public string status { get; set; }
        public string actType { get; set; }
        public string stDate { get; set; }
        public string endDate { get; set; }
        public string reportId { get; set; }
        public char flag { get; set; }
    }

    public class SectionEntity
    {
        public string course { get; set; }
        public string semester { get; set; }
        public string sectionName { get; set; }
        public string customerId { get; set; }
        public string userId { get; set; }
        public char flag { get; set; }

        public string reportId { get; set; }
    }
    public class SubjectEntity
    {
        public string subjectCode { get; set; }
        public string subjectName { get; set; }
        public string shortName { get; set; }
        public string medium { get; set; }
        public string activityType { get; set; }
        public string subjectType { get; set; }
        public string reportId { get; set; }
        public char flag { get; set; }
    }
    public class MappingEntity
    {
        public string id { get; set; }
        public string course { get; set; }
        public string semester { get; set; }
        public string subject { get; set; }
        public string customerId { get; set; }
        public string userId { get; set; }
        public string reportId { get; set; }
        public char flag { get; set; }
    }


}