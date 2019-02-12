﻿using DaL;
using ERP.Controllers;
using ERP.Models.Bal.Common;
using ERP.Models.Entity;
using Models.Entity;
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
        string sqlConn =System.Configuration.ConfigurationManager.ConnectionStrings["CS"].ConnectionString;
        UserEntity objUserEntity = UserEntity.GetInstance();
        public ResultEntity AddAcademicYear(AcademicEntity masterEntity,string customerId,string userid)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[9];
                sqlParameter[0] = new SqlParameter("@P_YEAR_CODE", masterEntity.yearCode);
                sqlParameter[1] = new SqlParameter("@P_ACADEMIC_YEAR", masterEntity.academicYear);
                sqlParameter[2] = new SqlParameter("@P_WFDATE", masterEntity.wfDate);
                sqlParameter[3] = new SqlParameter("@P_WTDATE", masterEntity.wtDate);
                sqlParameter[4] = new SqlParameter("@P_FLAG",masterEntity.flag);
                sqlParameter[5] = new SqlParameter("@P_CUSTOMER_ID", customerId);
                sqlParameter[6] = new SqlParameter("@P_USER_ID", userid);

                sqlParameter[7] = new SqlParameter("@P_RSP_FLAG",SqlDbType.Char);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 1;
                sqlParameter[8] = new SqlParameter("@P_RSP_MSG", SqlDbType.NVarChar);
                sqlParameter[8].Direction = ParameterDirection.Output;
                sqlParameter[8].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_ACADEMIC_YEAR", sqlParameter);
                result.flag = sqlParameter[7].Value.ToString();
                result.msg = sqlParameter[8].Value.ToString();

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

        public ResultEntity AddCourse(CourseEntity courseEntity,string customerId,string userId)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                objUserEntity = (UserEntity)HttpContext.Current.Session["UserDetails"];

                SqlParameter[] sqlParameter = new SqlParameter[8];
                sqlParameter[0] = new SqlParameter("@P_COURSE_CODE", courseEntity.courseCode);
                sqlParameter[1] = new SqlParameter("@P_COURSE_NAME", courseEntity.courseName);
                sqlParameter[2] = new SqlParameter("@P_NO_SEMESTER", courseEntity.noOfSemester);
                sqlParameter[3] = new SqlParameter("@P_FLAG", courseEntity.flag);
                sqlParameter[4] = new SqlParameter("@P_CUSTOMER_ID", customerId);
                sqlParameter[5] = new SqlParameter("@P_USER_ID", userId);


                sqlParameter[6] = new SqlParameter("@P_RSP_FLAG", SqlDbType.Char);
                sqlParameter[6].Direction = ParameterDirection.Output;
                sqlParameter[6].Size = 1;
                sqlParameter[7] = new SqlParameter("@P_RSP_MSG", SqlDbType.NVarChar);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_COURSE", sqlParameter);
                result.flag = sqlParameter[6].Value.ToString();
                result.msg = sqlParameter[7].Value.ToString();

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
        public ResultEntity AddDuration(DurationEntity durationEntity, string customerId, string userId)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[10];
                sqlParameter[0] = new SqlParameter("@P_ACAD_YEAR", durationEntity.academicYear);
                sqlParameter[1] = new SqlParameter("@P_ACAD_COURSE", durationEntity.course);
                sqlParameter[2] = new SqlParameter("@P_NO_SEMESTER", durationEntity.semester);
                sqlParameter[3] = new SqlParameter("@P_WFDATE", durationEntity.wefDate);
                sqlParameter[4] = new SqlParameter("@P_WTDATE", durationEntity.wetDate);
                sqlParameter[5] = new SqlParameter("@P_FLAG", durationEntity.flag);
                sqlParameter[6] = new SqlParameter("@P_CUSTOMER_ID", customerId);
                sqlParameter[7] = new SqlParameter("@P_USER_ID", userId);

                sqlParameter[8] = new SqlParameter("@P_RSP_FLAG", System.Data.SqlDbType.NVarChar);
                sqlParameter[8].Direction = ParameterDirection.Output;
                sqlParameter[8].Size = 1;
                sqlParameter[9] = new SqlParameter("@P_RSP_MSG", SqlDbType.NVarChar);
                sqlParameter[9].Direction = ParameterDirection.Output;
                sqlParameter[9].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_DURATION", sqlParameter);
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