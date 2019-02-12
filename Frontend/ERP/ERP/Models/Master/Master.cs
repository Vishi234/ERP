using DaL;
using ERP.Controllers;
using ERP.Models.Common;
using ERP.Models.Entity;
using Models.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ERP.Models.Master
{
    public class Master
    {
        string sqlConn =System.Configuration.ConfigurationManager.ConnectionStrings["CS"].ConnectionString;
        UserEntity objUserEntity = UserEntity.GetInstance();
        public ResultEntity AddAcademicYear(MasterEntity masterEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[7];
                sqlParameter[0] = new SqlParameter("@P_YEAR_CODE", masterEntity.yearCode);
                sqlParameter[1] = new SqlParameter("@P_ACADEMIC_YEAR", masterEntity.academicYear);
                sqlParameter[2] = new SqlParameter("@P_WFDATE", masterEntity.wfDate);
                sqlParameter[3] = new SqlParameter("@P_WTDATE", masterEntity.wtDate);
                sqlParameter[4] = new SqlParameter("@P_FLAG",masterEntity.flag);

                sqlParameter[5] = new SqlParameter("@P_RSP_FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[5].Direction = ParameterDirection.Output;
                sqlParameter[5].Size = 1;
                sqlParameter[6] = new SqlParameter("@P_RSP_MSG", SqlDbType.NVarChar);
                sqlParameter[6].Direction = ParameterDirection.Output;
                sqlParameter[6].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_ACADEMIC_YEAR", sqlParameter);
                result.flag = sqlParameter[5].Value.ToString();
                result.msg = sqlParameter[6].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {

                            
                            result.addParams =CommonFunc.DtToJSON(ds.Tables[0]);
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
        public ResultEntity AddActivity(ActivityEntity activityEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[7];
                sqlParameter[0] = new SqlParameter("@P_ACT_NAME", activityEntity.actName);
                sqlParameter[1] = new SqlParameter("@P_ACT_STATUS", activityEntity.status);
                sqlParameter[2] = new SqlParameter("@P_ACT_TYPE", activityEntity.actType);
                sqlParameter[3] = new SqlParameter("@P_ACT_START", activityEntity.stDate);
                sqlParameter[4] = new SqlParameter("@P_ACT_END", activityEntity.endDate);
                sqlParameter[5] = new SqlParameter("@P_FLAG", activityEntity.flag);

                sqlParameter[6] = new SqlParameter("@P_RSP_FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[6].Direction = ParameterDirection.Output;
                sqlParameter[6].Size = 1;
                sqlParameter[7] = new SqlParameter("@P_RSP_MSG", SqlDbType.NVarChar);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_ACTIVITY", sqlParameter);
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

        public ResultEntity AddCourse(CourseEntity courseEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                objUserEntity = (UserEntity)HttpContext.Current.Session["UserDetails"];

                SqlParameter[] sqlParameter = new SqlParameter[7];
                sqlParameter[0] = new SqlParameter("@P_COURSE_CODE", courseEntity.courseCode);
                sqlParameter[1] = new SqlParameter("@P_COURSE_NAME", courseEntity.courseName);
                sqlParameter[2] = new SqlParameter("@P_NO_SEMESTER", courseEntity.noOfSemester);
                sqlParameter[3] = new SqlParameter("@P_FLAG", courseEntity.flag);
                sqlParameter[4] = new SqlParameter("@P_USER", objUserEntity.UserName);
                

                sqlParameter[5] = new SqlParameter("@P_RSP_FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[5].Direction = ParameterDirection.Output;
                sqlParameter[5].Size = 1;
                sqlParameter[6] = new SqlParameter("@P_RSP_MSG", SqlDbType.NVarChar);
                sqlParameter[6].Direction = ParameterDirection.Output;
                sqlParameter[6].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_COURSE", sqlParameter);
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
        public ResultEntity AddDuration(DurationEntity durationEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[8];
                sqlParameter[0] = new SqlParameter("@P_ACAD_YEAR", durationEntity.academicYear);
                sqlParameter[1] = new SqlParameter("@P_ACAD_COURSE", durationEntity.course);
                sqlParameter[2] = new SqlParameter("@P_NO_SEMESTER", durationEntity.semester);
                sqlParameter[3] = new SqlParameter("@P_WFDATE", durationEntity.wefDate);
                sqlParameter[4] = new SqlParameter("@P_WTDATE", durationEntity.wetDate);
                sqlParameter[5] = new SqlParameter("@P_FLAG", durationEntity.flag);

                sqlParameter[6] = new SqlParameter("@P_RSP_FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[6].Direction = ParameterDirection.Output;
                sqlParameter[6].Size = 1;
                sqlParameter[7] = new SqlParameter("@P_RSP_MSG", SqlDbType.NVarChar);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_DURATION", sqlParameter);
                result.flag = sqlParameter[4].Value.ToString();
                result.msg = sqlParameter[5].Value.ToString();

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
            //SqlParameter[] sqlParameter = new SqlParameter[];
           // sqlParameter[0] = new SqlParameter("@P_FLAG", 'A');
            dr =SqlHelper.ExecuteReader(sqlConn, "SP_GET_COURSE_SEM_DETAILS");
            string details = CommonFunc.RdrToJSON(dr);
            return details;
        }

    }
}