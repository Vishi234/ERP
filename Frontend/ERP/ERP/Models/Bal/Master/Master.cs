using DaL;
using ERP.Controllers;
using ERP.Models.Bal.Common;
using ERP.Models.Entity;
using ERP.Models.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ERP.Models.Bal.Master
{
    public class Master
    {
        string sqlConn = System.Configuration.ConfigurationManager.ConnectionStrings["CS"].ConnectionString;
        UserEntity objUserEntity = UserEntity.GetInstance();
        public ResultEntity AddAcademicYear(AcademicEntity academicEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[11];
                sqlParameter[0] = new SqlParameter("@YEAR_ID", academicEntity.yearId);
                sqlParameter[1] = new SqlParameter("@CUSTOMER_ID", Convert.ToInt32(objUserEntity.customerId));
                sqlParameter[2] = new SqlParameter("@USER_ID", objUserEntity.userId);
                sqlParameter[3] = new SqlParameter("@YEAR", academicEntity.academicYear);
                sqlParameter[4] = new SqlParameter("@START_DATE", academicEntity.wfDate);
                sqlParameter[5] = new SqlParameter("@END_DATE", academicEntity.wtDate);
                sqlParameter[6] = new SqlParameter("@IS_ACTIVE", academicEntity.active);
                sqlParameter[7] = new SqlParameter("@OPER_TYPE", academicEntity.flag);               
                sqlParameter[8] = new SqlParameter("@REPORT_ID", Convert.ToInt32(academicEntity.reportId));
                sqlParameter[9] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[9].Direction = ParameterDirection.Output;
                sqlParameter[9].Size = 1;
                sqlParameter[10] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[10].Direction = ParameterDirection.Output;
                sqlParameter[10].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ACADEMIC_YEAR", sqlParameter);
                result.flag = sqlParameter[9].Value.ToString();
                result.msg = sqlParameter[10].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                        }
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        public ResultEntity AddActivity(ActivityEntity activityEntity, string customerId, string userid)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[12];
                sqlParameter[0] = new SqlParameter("@ID", activityEntity.id);
                sqlParameter[1] = new SqlParameter("@ACT_NAME", activityEntity.actName);
                sqlParameter[2] = new SqlParameter("@ACT_STATUS", activityEntity.status);
                sqlParameter[3] = new SqlParameter("@ACT_TYPE", activityEntity.actType);
                sqlParameter[4] = new SqlParameter("@START_DATE", activityEntity.stDate);
                sqlParameter[5] = new SqlParameter("@END_DATE", activityEntity.endDate);
                sqlParameter[6] = new SqlParameter("@OPER_TYPE", activityEntity.flag);
                sqlParameter[7] = new SqlParameter("@CUSTOMER_ID", customerId);
                sqlParameter[8] = new SqlParameter("@USER_ID", userid);
                sqlParameter[9] = new SqlParameter("@REPORT_ID", activityEntity.reportId);
                sqlParameter[10] = new SqlParameter("@FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[10].Direction = ParameterDirection.Output;
                sqlParameter[10].Size = 1;
                sqlParameter[11] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[11].Direction = ParameterDirection.Output;
                sqlParameter[11].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ACTIVITY", sqlParameter);
                result.flag = sqlParameter[10].Value.ToString();
                result.msg = sqlParameter[11].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                        }
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }

        public ResultEntity AddCourse(CourseEntity courseEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                objUserEntity = (UserEntity)HttpContext.Current.Session["UserDetails"];
                SqlParameter[] sqlParameter = new SqlParameter[11];
                sqlParameter[0] = new SqlParameter("@COURSE_ID", courseEntity.courserId);
                sqlParameter[1] = new SqlParameter("@CUSTOMER_ID", objUserEntity.customerId);
                sqlParameter[2] = new SqlParameter("@USER_ID", objUserEntity.userId);
                sqlParameter[3] = new SqlParameter("@COURSE_TYPE", courseEntity.courseType);
                sqlParameter[4] = new SqlParameter("@COURSE_NAME", courseEntity.courseName);
                sqlParameter[5] = new SqlParameter("@NO_SEMESTER", courseEntity.noOfSemester);
                sqlParameter[6] = new SqlParameter("@IS_ACTIVE", courseEntity.active);
                sqlParameter[7] = new SqlParameter("@OPER_TYPE", courseEntity.flag);
                sqlParameter[8] = new SqlParameter("@REPORT_ID", Convert.ToInt32(courseEntity.reportId));
                sqlParameter[9] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[9].Direction = ParameterDirection.Output;
                sqlParameter[9].Size = 1;
                sqlParameter[10] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[10].Direction = ParameterDirection.Output;
                sqlParameter[10].Size = 500;
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_COURSE", sqlParameter);
                result.flag = sqlParameter[9].Value.ToString();
                result.msg = sqlParameter[10].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                        }
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        public ResultEntity AddDuration(DurationEntity durationEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[13];
                sqlParameter[0] = new SqlParameter("@DUR_ID", durationEntity.id);
                sqlParameter[1] = new SqlParameter("@CUSTOMER_ID", objUserEntity.customerId);
                sqlParameter[2] = new SqlParameter("@USER_ID", objUserEntity.userId);
                sqlParameter[3] = new SqlParameter("@YEAR_ID", durationEntity.academicYear);
                sqlParameter[4] = new SqlParameter("@COURSE_ID", durationEntity.courseId);
                sqlParameter[5] = new SqlParameter("@NO_SEMESTER", durationEntity.semester);
                sqlParameter[6] = new SqlParameter("@START_DATE", durationEntity.wefDate);
                sqlParameter[7] = new SqlParameter("@END_DATE", durationEntity.wetDate);
                sqlParameter[8] = new SqlParameter("@IS_ACTIVE", durationEntity.flag);
                sqlParameter[9] = new SqlParameter("@OPER_TYPE", durationEntity.flag);

                sqlParameter[10] = new SqlParameter("@REPORT_ID", Convert.ToInt32(durationEntity.reportId));

                sqlParameter[11] = new SqlParameter("@FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[11].Direction = ParameterDirection.Output;
                sqlParameter[11].Size = 1;
                sqlParameter[12] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[12].Direction = ParameterDirection.Output;
                sqlParameter[12].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_COURSE_DURATION", sqlParameter);
                result.flag = sqlParameter[11].Value.ToString();
                result.msg = sqlParameter[12].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                        }
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        public ResultEntity AddMappingDetails(MappingEntity mapping)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[10];
                sqlParameter[0] = new SqlParameter("@ID", mapping.id);
                sqlParameter[1] = new SqlParameter("@CUSTOMER_ID", objUserEntity.customerId);
                sqlParameter[2] = new SqlParameter("@USER_ID", objUserEntity.userId);
                sqlParameter[3] = new SqlParameter("@COURSE_ID", mapping.course);
                sqlParameter[4] = new SqlParameter("@SEMESTER", mapping.semester);
                sqlParameter[5] = new SqlParameter("@SUBJECT_ID", mapping.subject);
                sqlParameter[6] = new SqlParameter("@IS_ACTIVE", mapping.active);
                sqlParameter[7] = new SqlParameter("@OPER_TYPE", mapping.flag);

                sqlParameter[8] = new SqlParameter("@REPORT_ID", mapping.reportId);
                sqlParameter[9] = new SqlParameter("@FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[9].Direction = ParameterDirection.Output;
                sqlParameter[9].Size = 1;
                sqlParameter[10] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[10].Direction = ParameterDirection.Output;
                sqlParameter[10].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_COURSE_MAPPING", sqlParameter);
                result.flag = sqlParameter[9].Value.ToString();
                result.msg = sqlParameter[10].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                        }
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        public string CourseDuration()
        {
            SqlDataReader dr;
            dr = SqlHelper.ExecuteReader(sqlConn, "SP_GET_COURSE_SEM_DETAILS");
            string details = CommonFunc.RdrToJSON(dr);
            return details;
        }

        public string GetCourseDDL(string ddlType)
        {
            try
            {
                SqlDataReader dr;
                SqlParameter[] sqlParameter = new SqlParameter[2];
                sqlParameter[0] = new SqlParameter("@P_FLAG", '2');
                sqlParameter[1] = new SqlParameter("@DDL_TYPE", ddlType);
                dr = SqlHelper.ExecuteReader(sqlConn, CommandType.StoredProcedure, "SP_GET_COURSE_SEM_DETAILS",sqlParameter);
                string details = CommonFunc.RdrToJSON(dr);
                return details;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return "";
            }
        }

        public ResultEntity SaveSectionDetails(SectionEntity sectionEntity,string customerId,string userId)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlDataReader dr;
                SqlParameter[] sqlParameter = new SqlParameter[9];
                sqlParameter[0] = new SqlParameter("@COURSE_NAME", sectionEntity.course);
                sqlParameter[1] = new SqlParameter("@SEMESTER_NAME", sectionEntity.semester);
                sqlParameter[2] = new SqlParameter("@SECTION", sectionEntity.sectionName);
                sqlParameter[3] = new SqlParameter("@CUSTOMER_ID", customerId);
                sqlParameter[4] = new SqlParameter("@USER_ID", sectionEntity.userId);
                sqlParameter[5] = new SqlParameter("@REPORT_ID", sectionEntity.reportId);
                sqlParameter[6] = new SqlParameter("@OPER_TYPE", sectionEntity.flag);

                sqlParameter[7] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 1;
                sqlParameter[8] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[8].Direction = ParameterDirection.Output;
                sqlParameter[8].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_SECTION_AMD", sqlParameter);              
                result.flag = sqlParameter[7].Value.ToString();
                result.msg = sqlParameter[8].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                        }
                    }
                }

                return result;

            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        public ResultEntity AddSubject(SubjectEntity subjectEntity, string customerId, string userid)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[12];
                sqlParameter[0] = new SqlParameter("@P_SUBJECT_CODE", subjectEntity.subjectCode);
                sqlParameter[1] = new SqlParameter("@P_SUBJECT_NAME", subjectEntity.subjectName);
                sqlParameter[2] = new SqlParameter("@P_SUBJECT_SHORT_NAME", subjectEntity.shortName);
                sqlParameter[3] = new SqlParameter("@SUBJECT_MEDIUM", subjectEntity.medium);
                sqlParameter[4] = new SqlParameter("@ACTIVITY_TYPE", subjectEntity.activityType);
                sqlParameter[5] = new SqlParameter("@SUBJECT_TYPE", subjectEntity.subjectType);
                sqlParameter[6] = new SqlParameter("@OPER_TYPE", subjectEntity.flag);
                sqlParameter[7] = new SqlParameter("@P_CUSTOMER_ID", customerId);
                sqlParameter[8] = new SqlParameter("@P_USER_ID", userid);
                sqlParameter[9] = new SqlParameter("@REPORT_ID", Convert.ToInt32(subjectEntity.reportId));
                sqlParameter[10] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[10].Direction = ParameterDirection.Output;
                sqlParameter[10].Size = 1;
                sqlParameter[11] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[11].Direction = ParameterDirection.Output;
                sqlParameter[11].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_SUBJECT", sqlParameter);
                result.flag = sqlParameter[10].Value.ToString();
                result.msg = sqlParameter[11].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
                        }
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }

    }
}