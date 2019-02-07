using DaL;
using ERP.Models.Common;
using ERP.Models.Entity;
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
        public ResultEntity AddAcademicYear(MasterEntity masterEntity)
        {
            ResultEntity result = new ResultEntity();
            try
            {
                SqlParameter[] sqlParameter = new SqlParameter[5];
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
                ds = SqlHelper.ExecuteDataset(sqlConn, CommandType.StoredProcedure, "SP_ADD_CUSTOMER_AMD", sqlParameter);
                result.flag = sqlParameter[11].Value.ToString();
                result.msg = sqlParameter[12].Value.ToString();

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

    }
}