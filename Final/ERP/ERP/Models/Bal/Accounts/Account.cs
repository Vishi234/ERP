using DaL;
using ERP.Models.Bal.Common;
using ERP.Models.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ERP.Models.Bal.Accounts
{
    public class Account
    {
        string sqlConn = System.Configuration.ConfigurationManager.ConnectionStrings["CS"].ConnectionString;
        UserEntity objUserEntity = UserEntity.GetInstance();


        public ResultEntity AddFeeDetails(AccountEntity accountEntity)
        {
            ResultEntity result = new ResultEntity();
            UserEntity objUserEntity = UserEntity.GetInstance();
            try
            {
                //  UserEntity objUserEntity = UserEntity.GetInstance();
                SqlParameter[] sqlParameter = new SqlParameter[13];
                sqlParameter[0] = new SqlParameter("@ID", accountEntity.typeid);
                sqlParameter[1] = new SqlParameter("@FEE_NAME", accountEntity.feeName);
                sqlParameter[2] = new SqlParameter("@PAYMENT_TYPE", accountEntity.paymentType);
                sqlParameter[3] = new SqlParameter("@MONTH", accountEntity.feePeriod);
                sqlParameter[4] = new SqlParameter("@TERMS", Convert.ToInt32(accountEntity.terms));
                sqlParameter[5] = new SqlParameter("@DESCRIPTION", accountEntity.feeDesc);
                sqlParameter[6] = new SqlParameter("@CUSTOMER_ID", objUserEntity.customerId);
                sqlParameter[7] = new SqlParameter("@USER_ID", objUserEntity.userId);
                sqlParameter[8] = new SqlParameter("@IS_ACTIVE", accountEntity.isActive);
                sqlParameter[9] = new SqlParameter("@OPER_TYPE", accountEntity.flag);
                sqlParameter[10] = new SqlParameter("@REPORT_ID", accountEntity.reportId);

                sqlParameter[11] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[11].Direction = ParameterDirection.Output;
                sqlParameter[11].Size = 1;
                sqlParameter[12] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[12].Direction = ParameterDirection.Output;
                sqlParameter[12].Size = 500;

                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_MANAGE_FEE_TYPE", sqlParameter);
                result.flag = sqlParameter[11].Value.ToString();
                result.msg = sqlParameter[12].Value.ToString();

                if (result.flag.ToUpper() == "S")
                {
                    if (ds.Tables.Count > 0)
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

        public ResultEntity GetFeeDetails(AccountEntity accountEntity)
        {
            ResultEntity result = new ResultEntity();
            UserEntity objUserEntity = UserEntity.GetInstance();
            try
            {
                //  UserEntity objUserEntity = UserEntity.GetInstance();
                SqlParameter[] sqlParameter = new SqlParameter[4];
                sqlParameter[0] = new SqlParameter("@ACADEMIC_YEAR", accountEntity.academicYear);
                sqlParameter[1] = new SqlParameter("@COURSE", accountEntity.courseId);
                sqlParameter[2] = new SqlParameter("@CUSTOMER_ID", objUserEntity.customerId);
                sqlParameter[3] = new SqlParameter("@REPORT_ID", accountEntity.reportMapId);
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_GET_FEE_DETAILS", sqlParameter);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
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
        public ResultEntity SaveFeeRecords(string records)
        {
            ResultEntity result = new ResultEntity();
            UserEntity objUserEntity = UserEntity.GetInstance();
            try
            {
                //  UserEntity objUserEntity = UserEntity.GetInstance();
                SqlParameter[] sqlParameter = new SqlParameter[5];
                sqlParameter[0] = new SqlParameter("@CUSTOMER_ID", objUserEntity.customerId);
                sqlParameter[1] = new SqlParameter("@USER_ID", objUserEntity.userId);
                sqlParameter[2] = new SqlParameter("@JSON_DATA", records);
                sqlParameter[3] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[3].Direction = ParameterDirection.Output;
                sqlParameter[3].Size = 1;
                sqlParameter[4] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[4].Direction = ParameterDirection.Output;
                sqlParameter[4].Size = 500;
                SqlHelper.ExecuteScalar(sqlConn, CommandType.StoredProcedure, "SP_MANAGE_FEE_DETAILS", sqlParameter);
                result.flag = sqlParameter[3].Value.ToString();
                result.msg = sqlParameter[4].Value.ToString();
                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        public ResultEntity GetPayments(AccountEntity accountEntity)
        {
            ResultEntity result = new ResultEntity();
            UserEntity objUserEntity = UserEntity.GetInstance();
            try
            {
                //  UserEntity objUserEntity = UserEntity.GetInstance();
                SqlParameter[] sqlParameter = new SqlParameter[2];
                sqlParameter[0] = new SqlParameter("@CUSTOMER_ID", objUserEntity.customerId);
                sqlParameter[1] = new SqlParameter("@REPORT_ID", accountEntity.reportId);
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_GET_STUDENT_FEE_DETAILS", sqlParameter);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
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

        public ResultEntity GetPaymentDeatils(GetPaymentEntity paymentEntity)
        {
            ResultEntity result = new ResultEntity();
            UserEntity objUserEntity = UserEntity.GetInstance();
            try
            {
                //  UserEntity objUserEntity = UserEntity.GetInstance();
                SqlParameter[] sqlParameter = new SqlParameter[9];
                sqlParameter[0] = new SqlParameter("@STU_CODE", paymentEntity.stuCode);
                sqlParameter[1] = new SqlParameter("@ACADEMIC_YEAR", paymentEntity.academicYear);
                sqlParameter[2] = new SqlParameter("@COURSE", paymentEntity.courseId);
                sqlParameter[3] = new SqlParameter("@CUSTOMER_ID", paymentEntity.customerId);
                sqlParameter[4] = new SqlParameter("@REPORT_ID", Convert.ToInt32(paymentEntity.reportId));


                sqlParameter[5] = new SqlParameter("@RECIEPT_NO", SqlDbType.Char);
                sqlParameter[5].Direction = ParameterDirection.Output;
                sqlParameter[5].Size = 200;
                sqlParameter[6] = new SqlParameter("@PAYMENT_TYPE", SqlDbType.NVarChar);
                sqlParameter[6].Direction = ParameterDirection.Output;
                sqlParameter[6].Size = 2;
                sqlParameter[7] = new SqlParameter("@REMARKS", SqlDbType.NVarChar);
                sqlParameter[7].Direction = ParameterDirection.Output;
                sqlParameter[7].Size = 500;
                sqlParameter[8] = new SqlParameter("@PAYMENT_DATE", SqlDbType.NVarChar);
                sqlParameter[8].Direction = ParameterDirection.Output;
                sqlParameter[8].Size = 500;



                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_GET_STUDENT_FEE_PAY_LIST", sqlParameter);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
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

        public ResultEntity SavePaymentRecords(string records, string studentCode, string studentName, string acYear, string courceName, string paymentType, string paymentDate, string recieptNo)
        {
            ResultEntity result = new ResultEntity();
            UserEntity objUserEntity = UserEntity.GetInstance();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[12];
                sqlParameter[0] = new SqlParameter("@STU_CODE", studentCode);
                sqlParameter[1] = new SqlParameter("@STUDENT_NAME", studentName);
                sqlParameter[2] = new SqlParameter("@ACADEMIC_YEAR", acYear);
                sqlParameter[3] = new SqlParameter("@COURSE", courceName);
                sqlParameter[4] = new SqlParameter("@PAYMENT_TYPE", paymentType);
                sqlParameter[5] = new SqlParameter("@PAYMENT_DATE", paymentDate);
                sqlParameter[6] = new SqlParameter("@RECIEPT_NO", recieptNo);
                sqlParameter[7] = new SqlParameter("@RECORDS", records);
                sqlParameter[8] = new SqlParameter("@CUSTOMER_ID", objUserEntity.customerId);
                sqlParameter[9] = new SqlParameter("@USER_ID", objUserEntity.userId);
                sqlParameter[10] = new SqlParameter("@FLAG", SqlDbType.Char);
                sqlParameter[10].Direction = ParameterDirection.Output;
                sqlParameter[10].Size = 1;
                sqlParameter[11] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                sqlParameter[11].Direction = ParameterDirection.Output;
                sqlParameter[11].Size = 500;
                SqlHelper.ExecuteScalar(sqlConn, CommandType.StoredProcedure, "SP_STUDENT_FEE_PAYMENT", sqlParameter);
                result.flag = sqlParameter[10].Value.ToString();
                result.msg = sqlParameter[11].Value.ToString();
                return result;
            }
            catch (Exception ex)
            {
                Excep.WriteException(ex);
                return result;
            }
        }
        public ResultEntity GetPaymentHistory(GetPaymentEntity paymentEntity)
        {
            ResultEntity result = new ResultEntity();
            UserEntity objUserEntity = UserEntity.GetInstance();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[4];
                sqlParameter[0] = new SqlParameter("@STU_CODE", paymentEntity.stuCode);
                sqlParameter[1] = new SqlParameter("@ACADEMIC_YEAR", paymentEntity.academicYear);
                sqlParameter[2] = new SqlParameter("@COURSE", paymentEntity.courseId);
                sqlParameter[3] = new SqlParameter("@REPORT_ID", Convert.ToInt32(paymentEntity.reportId));
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_GET_STUDENT_PAYMENT_HISTORY", sqlParameter);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
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
        public ResultEntity GetFeeCollectionReport(string acYear, string course, string semester, string feeType, string reportType, string reportId)
        {
            ResultEntity result = new ResultEntity();
            UserEntity objUserEntity = UserEntity.GetInstance();
            try
            {
                //  UserEntity objUserEntity = UserEntity.GetInstance();
                SqlParameter[] sqlParameter = new SqlParameter[7];
                sqlParameter[0] = new SqlParameter("@ACADEMIC_YEAR", acYear);
                sqlParameter[1] = new SqlParameter("@COURSE", course);
                sqlParameter[2] = new SqlParameter("@SEMESTER", semester);
                sqlParameter[3] = new SqlParameter("@FEE_TYPE", feeType);
                sqlParameter[4] = new SqlParameter("@CUSTOMER_ID", objUserEntity.customerId);
                sqlParameter[5] = new SqlParameter("@REPORT_TYPE", reportType);
                sqlParameter[6] = new SqlParameter("@REPORT_ID", Convert.ToInt32(reportId));
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_GET_FEE_COLLECTION_REPORT", sqlParameter);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
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