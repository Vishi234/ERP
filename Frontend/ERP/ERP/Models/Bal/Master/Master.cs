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
        public ResultEntity AddAcademicYear(AcademicEntity masterEntity, string customerId, string userid)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[9];
                sqlParameter[0] = new SqlParameter("@ACADEMIC_YEAR", masterEntity.academicYear);
                sqlParameter[1] = new SqlParameter("@START_DATE", masterEntity.wfDate);
                sqlParameter[2] = new SqlParameter("@END_DATE", masterEntity.wtDate);
                sqlParameter[3] = new SqlParameter("@OPER_TYPE", masterEntity.flag);
                sqlParameter[4] = new SqlParameter("@CUSTOMER_ID", customerId);
                sqlParameter[5] = new SqlParameter("@USER_ID", userid);
                sqlParameter[6] = new SqlParameter("@REPORT_ID", Convert.ToInt32(masterEntity.reportId));
                sqlParameter[7] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 1;
                sqlParameter[8] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[8].Direction = ParameterDirection.Output;
                sqlParameter[8].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ACADEMIC_YEAR", sqlParameter);
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
        public ResultEntity AddActivity(ActivityEntity activityEntity, string customerId, string userid)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[10];
                sqlParameter[0] = new SqlParameter("@P_ACT_NAME", activityEntity.actName);
                sqlParameter[1] = new SqlParameter("@P_ACT_STATUS", activityEntity.status);
                sqlParameter[2] = new SqlParameter("@P_ACT_TYPE", activityEntity.actType);
                sqlParameter[3] = new SqlParameter("@P_ACT_START", activityEntity.stDate);
                sqlParameter[4] = new SqlParameter("@P_ACT_END", activityEntity.endDate);
                sqlParameter[5] = new SqlParameter("@P_FLAG", activityEntity.flag);
                sqlParameter[6] = new SqlParameter("@P_CUSTOMER_ID", customerId);
                sqlParameter[7] = new SqlParameter("@P_USER_ID", userid);

                sqlParameter[8] = new SqlParameter("@P_RSP_FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[8].Direction = ParameterDirection.Output;
                sqlParameter[8].Size = 1;
                sqlParameter[9] = new SqlParameter("@P_RSP_MSG", SqlDbType.NVarChar);
                sqlParameter[9].Direction = ParameterDirection.Output;
                sqlParameter[9].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_ACTIVITY", sqlParameter);
                result.flag = sqlParameter[8].Value.ToString();
                result.msg = sqlParameter[9].Value.ToString();

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

        public ResultEntity AddCourse(CourseEntity masterEntity, string customerId, string userId)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                objUserEntity = (UserEntity)HttpContext.Current.Session["UserDetails"];
                SqlParameter[] sqlParameter = new SqlParameter[9];
                sqlParameter[0] = new SqlParameter("@P_COURSE_ID", masterEntity.courserId);
                sqlParameter[1] = new SqlParameter("@P_COURSE_NAME", masterEntity.courseName);
                sqlParameter[2] = new SqlParameter("@P_NO_SEMESTER", masterEntity.noOfSemester);
                sqlParameter[3] = new SqlParameter("@OPER_TYPE", masterEntity.flag);
                sqlParameter[4] = new SqlParameter("@P_CUSTOMER_ID", customerId);
                sqlParameter[5] = new SqlParameter("@P_USER_ID", userId);
                sqlParameter[6] = new SqlParameter("@REPORT_ID", Convert.ToInt32(masterEntity.reportId));
                sqlParameter[7] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 1;
                sqlParameter[8] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[8].Direction = ParameterDirection.Output;
                sqlParameter[8].Size = 500;
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_COURSE", sqlParameter);
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
        public ResultEntity AddDuration(DurationEntity masterEntity, string customerId, string userId)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[12];
                sqlParameter[0] = new SqlParameter("@P_ID", masterEntity.id);
                sqlParameter[1] = new SqlParameter("@P_ACADEMIC_YEAR", masterEntity.academicYear);
                sqlParameter[2] = new SqlParameter("@P_COURSE_NAME", masterEntity.course);
                sqlParameter[3] = new SqlParameter("@P_NO_SEMESTER", masterEntity.semester);
                sqlParameter[4] = new SqlParameter("@START_DATE", masterEntity.wefDate);
                sqlParameter[5] = new SqlParameter("@END_DATE", masterEntity.wetDate);
                sqlParameter[6] = new SqlParameter("@OPER_TYPE", masterEntity.flag);
                sqlParameter[7] = new SqlParameter("@P_CUSTOMER_ID", customerId);
                sqlParameter[8] = new SqlParameter("@P_USER_ID", userId);
                sqlParameter[9] = new SqlParameter("@REPORT_ID", Convert.ToInt32(masterEntity.reportId));

                sqlParameter[10] = new SqlParameter("@FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[10].Direction = ParameterDirection.Output;
                sqlParameter[10].Size = 1;
                sqlParameter[11] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[11].Direction = ParameterDirection.Output;
                sqlParameter[11].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_COURSE_DURATION", sqlParameter);
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
                SqlParameter[] sqlParameter = new SqlParameter[7];
                sqlParameter[0] = new SqlParameter("@P_COURSE", sectionEntity.course);
                sqlParameter[1] = new SqlParameter("@P_SEMESTER", sectionEntity.semester);
                sqlParameter[2] = new SqlParameter("@P_SECTION", sectionEntity.sectioin);
                sqlParameter[3] = new SqlParameter("@P_CUSTOMER_ID", customerId);
                sqlParameter[4] = new SqlParameter("@P_USER_ID", userId);

                sqlParameter[5] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[5].Direction = ParameterDirection.Output;
                sqlParameter[5].Size = 1;
                sqlParameter[6] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[6].Direction = ParameterDirection.Output;
                sqlParameter[6].Size = 500;

                dr = SqlHelper.ExecuteReader(sqlConn, CommandType.StoredProcedure, "SP_SECTION_AMD", sqlParameter);
                DataSet ds = new DataSet();
                result.flag = sqlParameter[5].Value.ToString();
                result.msg = sqlParameter[6].Value.ToString();

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
                sqlParameter[0] = new SqlParameter("@P_SUBJECT_CODE", subjectEntity.subCode);
                sqlParameter[1] = new SqlParameter("@P_SUBJECT_NAME", subjectEntity.subName);
                sqlParameter[2] = new SqlParameter("@P_SUBJECT_SHORT_NAME", subjectEntity.subShortName);
                sqlParameter[3] = new SqlParameter("@SUBJECT_MEDIUM", subjectEntity.subMedium);
                sqlParameter[4] = new SqlParameter("@ACTIVITY_TYPE", subjectEntity.subActivity);
                sqlParameter[5] = new SqlParameter("@SUBJECT_TYPE", subjectEntity.subType);
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