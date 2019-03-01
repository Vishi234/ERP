using DaL;
using ERP.Models.Bal.Common;
using ERP.Models.Entity;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace ERP.Models.Bal.Employee
{
    public class Employee
        {
            string sqlConn = System.Configuration.ConfigurationManager.ConnectionStrings["CS"].ConnectionString;
            UserEntity objUserEntity = UserEntity.GetInstance();

     
        //public ResultEntity AddEmployee(EmployeeEntity employeeEntity)
        //{
        //    ResultEntity result = new ResultEntity();
        //    try
        //    {
        //        UserEntity objUserEntity = UserEntity.GetInstance();
        //        SqlParameter[] sqlParameter = new SqlParameter[21];

        //        sqlParameter[0] = new SqlParameter("@P_USER_FNAME", employeeEntity.firstName);
        //        sqlParameter[1] = new SqlParameter("@P_USER_MNAME", employeeEntity.middleName);
        //        sqlParameter[2] = new SqlParameter("@P_USER_LNAME", employeeEntity.lastName);
        //        sqlParameter[3] = new SqlParameter("@P_USER_ADHAAR_NO", employeeEntity.adharNo);
        //        sqlParameter[4] = new SqlParameter("@P_USER_GENDER", employeeEntity.gender);
        //        sqlParameter[5] = new SqlParameter("@P_USER_BLOOD_GRP", employeeEntity.bloodgrp);
        //        sqlParameter[6] = new SqlParameter("@P_USER_MARITAL", employeeEntity.maritalst);
        //        sqlParameter[7] = new SqlParameter("@P_USER_DOB", employeeEntity.dob);
        //        sqlParameter[8] = new SqlParameter("@P_USER_JOIN_DATE", employeeEntity.joinDate);
        //        sqlParameter[9] = new SqlParameter("@P_USER_EMP_CODE", employeeEntity.empCode);
        //        sqlParameter[10] = new SqlParameter("@P_USER_PUNCH_CARD", employeeEntity.empPunchCard);
        //        sqlParameter[11] = new SqlParameter("@P_USER_DEPARTMENT", employeeEntity.empDepartment);
        //        sqlParameter[12] = new SqlParameter("@P_USER_DESIGNATION", employeeEntity.empDesignation);
        //        sqlParameter[13] = new SqlParameter("@P_EMPLOYEE_TYPE", employeeEntity.empType);
        //        sqlParameter[14] = new SqlParameter("@P_CUSTOMER_ID", objUserEntity.customerId);
        //        sqlParameter[15] = new SqlParameter("@REPORT_ID", Convert.ToInt32(employeeEntity.reportId));
        //        sqlParameter[16] = new SqlParameter("@P_IMG_PATH", employeeEntity.imgPath);
        //        sqlParameter[17] = new SqlParameter("@OPER_TYPE", employeeEntity.operType);

        //        sqlParameter[18] = new SqlParameter("@FLAG", SqlDbType.Char);
        //        sqlParameter[18].Direction = ParameterDirection.Output;
        //        sqlParameter[18].Size = 1;
        //        sqlParameter[19] = new SqlParameter("@P_USER_ID", SqlDbType.NVarChar);
        //        sqlParameter[19].Direction = ParameterDirection.Output;
        //        sqlParameter[19].Size = 100;
        //        sqlParameter[20] = new SqlParameter("@MSG", SqlDbType.NVarChar);
        //        sqlParameter[20].Direction = ParameterDirection.Output;
        //        sqlParameter[20].Size = 500;

        //        DataSet ds = new DataSet();
        //        ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_USER_GEN_INFO", sqlParameter);
        //        result.flag = sqlParameter[18].Value.ToString();
        //        result.optionalVal = sqlParameter[19].Value.ToString();
        //        result.msg = sqlParameter[20].Value.ToString();

        //        if (result.flag.ToUpper() == "S")
        //        {
        //            if (ds != null)
        //            {
        //                if (ds.Tables[0].Rows.Count > 0)
        //                {
        //                    result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
        //                }
        //            }
        //        }

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        Excep.WriteException(ex);
        //        return result;
        //    }
        //}
        //public ResultEntity AddUserContact(EmployeeEntity employeeEntity, string customerId, string userid)
        //    {
        //        ResultEntity result = new ResultEntity();
        //        try
        //        {
        //            SqlParameter[] sqlParameter = new SqlParameter[14];
        //            sqlParameter[0] = new SqlParameter("@P_USER_ADDRESS", employeeEntity.address);
        //            sqlParameter[1] = new SqlParameter("@P_USER_COUNTRY", employeeEntity.country);
        //            sqlParameter[2] = new SqlParameter("@P_USER_CITY", employeeEntity.city);
        //            sqlParameter[3] = new SqlParameter("@P_USER_STATE", employeeEntity.state);
        //            sqlParameter[4] = new SqlParameter("@P_USER_PINCODE", employeeEntity.pinCode);
        //            sqlParameter[5] = new SqlParameter("@P_USER_PHONE", employeeEntity.phone);
        //            sqlParameter[6] = new SqlParameter("@P_USER_MOBILE", employeeEntity.mobile);
        //            sqlParameter[7] = new SqlParameter("@P_USER_EMAIL", employeeEntity.email);
        //            sqlParameter[8] = new SqlParameter("@OPER_TYPE", employeeEntity.flag);
        //            sqlParameter[9] = new SqlParameter("@P_CUSTOMER_ID", customerId);
        //            sqlParameter[10] = new SqlParameter("@P_USER_ID", userid);
        //            sqlParameter[11] = new SqlParameter("@REPORT_ID", Convert.ToInt32(employeeEntity.reportId));
        //            sqlParameter[12] = new SqlParameter("@FLAG", SqlDbType.Char);
        //            sqlParameter[12].Direction = ParameterDirection.Output;
        //            sqlParameter[12].Size = 1;
        //            sqlParameter[13] = new SqlParameter("@MSG", SqlDbType.NVarChar);
        //            sqlParameter[13].Direction = ParameterDirection.Output;
        //            sqlParameter[13].Size = 500;

        //            DataSet ds = new DataSet();
        //            ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_USER_CONTACT_INFO", sqlParameter);
        //            result.flag = sqlParameter[12].Value.ToString();
        //            result.msg = sqlParameter[13].Value.ToString();

        //            if (result.flag.ToUpper() == "S")
        //            {
        //                if (ds != null)
        //                {
        //                    if (ds.Tables[0].Rows.Count > 0)
        //                    {
        //                        result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
        //                    }
        //                }
        //            }

        //            return result;
        //        }
        //        catch (Exception ex)
        //        {
        //            Excep.WriteException(ex);
        //            return result;
        //        }
        //    }
        //public ResultEntity AddUserAuth(EmployeeEntity employeeEntity, string customerId, string userid)
        //{
        //    ResultEntity result = new ResultEntity();
        //    try
        //    {
        //        SqlParameter[] sqlParameter = new SqlParameter[13];
        //        sqlParameter[0] = new SqlParameter("@P_USERNAME", employeeEntity.Username);
        //        sqlParameter[1] = new SqlParameter("@P_USER_PASSWORD", Encrypt(employeeEntity.password));
        //        sqlParameter[2] = new SqlParameter("@P_USER_DEF_PAGE", employeeEntity.defPage);
        //        sqlParameter[3] = new SqlParameter("@P_USER_ACC_STATUS", employeeEntity.accStatus);
        //        sqlParameter[4] = new SqlParameter("@P_USER_PANCARD", employeeEntity.panCard);
        //        sqlParameter[5] = new SqlParameter("@P_USER_BANK", employeeEntity.bank);
        //        sqlParameter[6] = new SqlParameter("@P_USER_ACC_NO", employeeEntity.accNumber);
               
        //        sqlParameter[7] = new SqlParameter("@OPER_TYPE", employeeEntity.flag);
        //        sqlParameter[8] = new SqlParameter("@P_CUSTOMER_ID", customerId);
        //        sqlParameter[9] = new SqlParameter("@P_USER_ID", userid);
        //        sqlParameter[10] = new SqlParameter("@REPORT_ID", Convert.ToInt32(employeeEntity.reportId));
        //        sqlParameter[11] = new SqlParameter("@FLAG", SqlDbType.Char);
        //        sqlParameter[11].Direction = ParameterDirection.Output;
        //        sqlParameter[11].Size = 1;
        //        sqlParameter[12] = new SqlParameter("@MSG", SqlDbType.NVarChar);
        //        sqlParameter[12].Direction = ParameterDirection.Output;
        //        sqlParameter[12].Size = 500;

        //        DataSet ds = new DataSet();
        //        ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_USER_AUTH_INFO", sqlParameter);
        //        result.flag = sqlParameter[11].Value.ToString();
        //        result.msg = sqlParameter[12].Value.ToString();

        //        if (result.flag.ToUpper() == "S")
        //        {
        //            if (ds != null)
        //            {
        //                if (ds.Tables[0].Rows.Count > 0)
        //                {
        //                    result.addParams = CommonFunc.DtToJSON(ds.Tables[0]);
        //                }
        //            }
        //        }

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        Excep.WriteException(ex);
        //        return result;
        //    }
        //}

        //private string Encrypt(string clearText)
        //{
        //    string EncryptionKey = "MAKV2SPBNI99212";
        //    byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
        //    using (Aes encryptor = Aes.Create())
        //    {
        //        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
        //        encryptor.Key = pdb.GetBytes(32);
        //        encryptor.IV = pdb.GetBytes(16);
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
        //            {
        //                cs.Write(clearBytes, 0, clearBytes.Length);
        //                cs.Close();
        //            }
        //            clearText = Convert.ToBase64String(ms.ToArray());
        //        }
        //    }
        //    return clearText;
        //}

        //private string Decrypt(string cipherText)
        //{
        //    string EncryptionKey = "MAKV2SPBNI99212";
        //    byte[] cipherBytes = Convert.FromBase64String(cipherText);
        //    using (Aes encryptor = Aes.Create())
        //    {
        //        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
        //        encryptor.Key = pdb.GetBytes(32);
        //        encryptor.IV = pdb.GetBytes(16);
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
        //            {
        //                cs.Write(cipherBytes, 0, cipherBytes.Length);
        //                cs.Close();
        //            }
        //            cipherText = Encoding.Unicode.GetString(ms.ToArray());
        //        }
        //    }
        //    return cipherText;
        //}

    }
}
