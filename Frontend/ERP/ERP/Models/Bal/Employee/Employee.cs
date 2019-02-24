using DaL;
using ERP.Models.Bal.Common;
using ERP.Models.Entity;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;

namespace ERP.Models.Bal.Employee
{
    public class Employee
        {
            string sqlConn = System.Configuration.ConfigurationManager.ConnectionStrings["CS"].ConnectionString;
            UserEntity objUserEntity = UserEntity.GetInstance();
            public ResultEntity AddUserContact(EmployeeEntity employeeEntity, string customerId, string userid)
            {
                ResultEntity result = new ResultEntity();
                try
                {
                    SqlParameter[] sqlParameter = new SqlParameter[14];
                    sqlParameter[0] = new SqlParameter("@P_USER_ADDRESS", employeeEntity.address);
                    sqlParameter[1] = new SqlParameter("@P_USER_COUNTRY", employeeEntity.country);
                    sqlParameter[2] = new SqlParameter("@P_USER_CITY", employeeEntity.city);
                    sqlParameter[3] = new SqlParameter("@P_USER_STATE", employeeEntity.state);
                    sqlParameter[4] = new SqlParameter("@P_USER_PINCODE", employeeEntity.pinCode);
                    sqlParameter[5] = new SqlParameter("@P_USER_PHONE", employeeEntity.phone);
                    sqlParameter[6] = new SqlParameter("@P_USER_MOBILE", employeeEntity.mobile);
                    sqlParameter[7] = new SqlParameter("@P_USER_EMAIL", employeeEntity.email);
                    sqlParameter[8] = new SqlParameter("@OPER_TYPE", employeeEntity.flag);
                    sqlParameter[9] = new SqlParameter("@P_CUSTOMER_ID", customerId);
                    sqlParameter[10] = new SqlParameter("@P_USER_ID", userid);
                    sqlParameter[11] = new SqlParameter("@REPORT_ID", Convert.ToInt32(employeeEntity.reportId));
                    sqlParameter[12] = new SqlParameter("@FLAG", SqlDbType.Char);
                    sqlParameter[12].Direction = ParameterDirection.Output;
                    sqlParameter[12].Size = 1;
                    sqlParameter[13] = new SqlParameter("@MSG", SqlDbType.NVarChar);
                    sqlParameter[13].Direction = ParameterDirection.Output;
                    sqlParameter[13].Size = 500;

                    DataSet ds = new DataSet();
                    ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_USER_CONTACT_INFO", sqlParameter);
                    result.flag = sqlParameter[12].Value.ToString();
                    result.msg = sqlParameter[13].Value.ToString();

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
